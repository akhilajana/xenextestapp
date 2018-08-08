import {Rooms} from './rooms.model';
import {EventEmitter, Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {catchError, map} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable({providedIn: 'root'})
export class RoomsService {

  private roomsList: Rooms[] = [
    new Rooms(
      1,
      'atest',
      'testDesc',
      'testHosp',
      'testProtocol',
      'testDate',
      'testStatus',
      'testEdit'
    ),
    new Rooms(
      2,
      'btest',
      'testDesc',
      'testHosp',
      'testProtocol',
      'testDate',
      'testStatus',
      'testEdit'
    ),
    new Rooms(
      3,
      'ctest',
      'testDesc',
      'testHosp',
      'testProtocol',
      'testDate',
      'testStatus',
      'testEdit'
    )
  ];

  roomsChanged = new EventEmitter<Rooms[]>();
  roomId = 3;
  private newRoomId: number;

  constructor(private http: Http) {}

  getRooms() {
    console.log('get room' + this.roomsList.toString());

     return this.roomsList.slice();

  }

  getRoomById(id: number) {
    const room = this.roomsList.find(
      (s) => {
        return s.roomId === id;
      }
    );
    return room;
  }

  generateNewRoomId() {
    this.newRoomId = this.roomId + 1;
    this.roomId = this.newRoomId;
    return this.roomId;
  }

  addRoom(room: Rooms) {

    const isPresent = this.roomsList.some((el) => el.hospitalName === room.hospitalName && el.roomName === room.roomName);
    if (!isPresent) {
      this.roomsList.push(room);
      this.postToServer(this.roomsList);
      this.roomsChanged.emit(this.roomsList.slice());
    } else {
      alert('Room already exists');
    }
    console.log('Add room' + this.roomsList.toString());
  }

  editRoom(roomId: number) {

    console.log('testttttt');
    this.roomsChanged.emit(this.roomsList.slice());
  }

  deleteRoom(roomId: number) {

    this.roomsList.splice(roomId, 1);
    this.postToServer(this.roomsList);
    this.roomsChanged.emit(this.roomsList.slice());
  }

  saveRoom(modifiedRoom: Rooms) {
    const indexOfItemInArray = this.roomsList.findIndex(q => q.roomId === modifiedRoom.roomId);
    this.roomsList.splice(indexOfItemInArray, 1, modifiedRoom);
    this.postToServer(this.roomsList);
    this.roomsChanged.emit(this.roomsList.slice());
  }

  postToServer(rooms: any[]) {
    const headers = new Headers({'Content-Type' : 'application/json'});
    console.log('post');
    console.log(rooms);
    return this.http.post('https://xenextestapp-35f35.firebaseio.com/rooms.json', rooms, {headers: headers});
  }

  putToServer(rooms: any[]) {
    const headers = new Headers({'Content-Type' : 'application/json'});
    return this.http.put('https://xenextestapp-35f35.firebaseio.com/rooms.json', rooms, {headers: headers});

  }

  getFromServer() {
    return this.http.get('https://xenextestapp-35f35.firebaseio.com/rooms.json')
      .pipe(map(
        (response: Response) => {
          const data = response.json();
          /*for (const room of data) {
            room.name = 'FETCHED_' + room.name;
          }*/
          console.log('data');
          console.log(data);
          return data;
        }
        )
      )
      .pipe(catchError(
        (error: Response) => {
          console.log(error);
          return throwError('Error in fetching rooms data from server' + error);
        }
        )
      );
  }
}
