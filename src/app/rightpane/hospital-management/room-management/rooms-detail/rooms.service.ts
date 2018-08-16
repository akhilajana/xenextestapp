import {Rooms} from './rooms.model';
import {Injectable} from '@angular/core';
import {Observable, Subject, throwError} from 'rxjs';
import {Headers, Http, Response} from '@angular/http';
import {DataStorageService} from '../../../../shared/data-storage/data-storage.service';
import {HttpService} from '../../../../shared/http-service/http-service.service';
import {catchError, map} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class RoomsService {

  private roomsList: Rooms[] = [];
  roomsChanged = new Subject<Rooms[]>();
  startedEditing = new Subject<number>();
  private room = '';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'X-Requested-With,content-type'
  });


  constructor(private dataStorageService: DataStorageService) {
  }

  getRoomsByOrganizationId(organizationId: number): Rooms[] {

    this.dataStorageService.fetchRooms(organizationId)
      .subscribe(
        (data: Rooms[]) => { this.roomsList.push(data); },
        error1 => {console.log(error1); },
        () => { console.log( this.roomsList); }
      );
    return this.roomsList;
  }

  // CRUD Operations
  addRoom(room: Rooms) {
    // this.roomsList.push(room); // adds it to local list - manages th table
    this.storeRoomsData(room); // adding it to server
    this.roomsChanged.next(this.roomsList.slice());
  }

  deleteRoom(roomIndex: number, roomId: number) {
    this.roomsList.splice(roomIndex, 1);
    console.log('roomId' + roomId);
    this.dataStorageService.deleteRooms(roomId)
      .subscribe(
        () => console.log('Room with id' + roomIndex + ' deleted'),
        (error1 => console.log('Error in deleting room' + error1))
      );
    this.roomsChanged.next(this.roomsList.slice());
  }

  saveRoom(modifiedRoom: Rooms) {
    const indexOfItemInArray = this.roomsList.findIndex(q => q.id === modifiedRoom.id);
    this.roomsList.splice(indexOfItemInArray, 1, modifiedRoom);
    this.storeRoomsData(modifiedRoom);
    /*this._httpService.put(this.roomsList, 'roomsList')
      .subscribe(
        (repsonse) => console.log(repsonse)
      );*/
    this.roomsChanged.next(this.roomsList.slice());
  }

  // Server calls
  storeRoomsData(newRoom: Rooms) {
    this.dataStorageService.storeRooms(newRoom)
      .subscribe(
        (data: Rooms) => {
          console.log('store data');
          console.log(data);
        },
        (error: any) => {
          console.log(error);
        }
      );
  }
}
