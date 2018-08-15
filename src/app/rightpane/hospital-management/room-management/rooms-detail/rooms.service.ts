import {Rooms} from './rooms.model';
import {Injectable} from '@angular/core';
import {HttpService} from '../../../../shared/http-service/http-service.service';
import {Subject} from 'rxjs';
import { Response } from '@angular/http';
import {DataStorageService} from '../../../../shared/data-storage/data-storage.service';

@Injectable({providedIn: 'root'})
export class RoomsService {

  private roomsList: Rooms[] = [
    new Rooms(null,
      1,
      'atest',
      'testDesc',
      'testHosp',
      'testProtocol',
      new Date(new Date().setDate(new Date().getDate() - 1)),
      true
    ),
    new Rooms(
      null,
      2,
      'btest',
      'testDesc',
      'testHosp',
      'testProtocol',
      new Date(),
      false
    ),
    new Rooms(
      null,
      3,
      'ctest',
      'testDesc',
      'testHosp',
      'testProtocol',
      new Date(new Date().setDate(new Date().getDate() - 3)),
     true
    )
  ];

  roomsChanged = new Subject<Rooms[]>();
  startedEditing = new Subject<number>();
  /*roomId = 3;
  private newRoomId: number;*/

  constructor(private _httpService: HttpService,  private dataStorageService: DataStorageService) {}

  getRooms() {
    // this._httpService.getRoomsData()
    //   .subscribe(
    //     (data) => {
    //                 this.roomsList.push(data);
    //             },
    //     (err) => console.log(err),
    //     () => console.log('done loading rooms')
    //
    //   );
    console.log(this.roomsList);
    return this.roomsList;

  }

  /*getRoomByName(roomName: string, hospitalName: string) {
    const room = this.roomsList.find(
      (s) => {
        return s.name === roomName && s.hospitalName === hospitalName;
      }
    );
    return room;
  }*/

  // generateNewRoomId() {
  //   this.newRoomId = this.roomId + 1;
  //   this.roomId = this.newRoomId;
  //   return this.roomId;
  // }

  addRoom(room: Rooms) {
      this.roomsList.push(room);
      this.storeRoomsData(room);
      this.roomsChanged.next(this.roomsList.slice());
  }

  private addToRoomsList(room: Rooms) {
   /* this._httpService.put(this.roomsList, 'rooms')
      .subscribe(
        (repsonse) => console.log(repsonse)
      );*/
    this.roomsChanged.next(this.roomsList.slice());
  }

  updateRoom(roomIndex: number) {
    // this.roomsList[roomIndex] = newRoomDetails;
    this.roomsChanged.next(this.roomsList.slice());
  }

  deleteRoom(roomId: number) {

    this.roomsList.splice(roomId, 1);
    // this._httpService.put(this.roomsList, 'rooms');
    this.roomsChanged.next(this.roomsList.slice());
  }

  saveRoom(modifiedRoom: Rooms) {
    const indexOfItemInArray = this.roomsList.findIndex(q => q.id === modifiedRoom.id);
    this.roomsList.splice(indexOfItemInArray, 1, modifiedRoom);
    /*this._httpService.put(this.roomsList, 'rooms')
      .subscribe(
        (repsonse) => console.log(repsonse)
      );*/
    this.roomsChanged.next(this.roomsList.slice());
  }

  storeRoomsData(newRoom: Rooms) {
    this.dataStorageService.storeRooms(newRoom)
      .subscribe(
        (response: Response) => {
          console.log('store data');
          console.log(response);
        }
      );
  }


}
