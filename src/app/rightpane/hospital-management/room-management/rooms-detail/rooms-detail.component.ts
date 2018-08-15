import {Component, ElementRef, NgModule, OnInit, ViewChild} from '@angular/core';
import {Rooms} from './rooms.model';
import {RoomsService} from './rooms.service';
import {Sort} from '@angular/material';
import {ExcelService} from '../../../../shared/exportasExcel.service';
import {ActivatedRoute, Data, Params, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {RoomProtocol} from '../room-protocol.model';


@Component({
  selector: 'app-rooms-detail',
  templateUrl: './rooms-detail.component.html',
  styleUrls: ['./rooms-detail.component.css']
})


export class RoomsDetailComponent implements OnInit {

  @ViewChild('roomsData') roomsForm: NgForm;

/*
  room: Rooms;
*/
  rooms: Rooms[] = [];
  sortedData: Rooms[];
  isEditable = false;
  editRowId: any = '';

  constructor(private roomsService: RoomsService,
              private excelService: ExcelService,
              private route: ActivatedRoute,
              private router: Router) {

  }


  ngOnInit(): any {

    this.rooms = this.roomsService.getRooms();
    this.sortedData = this.rooms.slice();
    this.roomsService.roomsChanged.subscribe(
      (rooms: Rooms[]) => {
        this.rooms = rooms;
      }
    );

   /* this.route.params
      .subscribe(
        (params: Params) => {
          this.room = this.roomsService.getRoomByName(+params['id']);
        }
      );*/


  }

  // CRUD Operations
  addRoom(newRoomForm: NgForm) {

    const newRoomValues = newRoomForm.value;

    const newRoomProtocol = new RoomProtocol(1,
      newRoomValues.newRomProtocolName,
      'rpDesc',
      newRoomValues.newHospitalName,
      2,
      22,
      true,
      'dt',
      'test user',
      true);
/*
    const newRoomId = this.roomsService.generateNewRoomId();
*/

    const newRoom = new Rooms(newRoomProtocol,
      -1,
      newRoomValues.newRoomName,
      newRoomValues.newRoomDescription,
      newRoomValues.newHospitalName,
      newRoomValues.newRoomProtocolName,
      newRoomValues.newCreatedDate,
      newRoomValues.newStatus);

    // check if room already exists
    if (this.rooms == null) {
      this.roomsService.addRoom(newRoom);
    } else {
      const isPresent = this.roomExists(newRoom);
      if (!isPresent) {
        this.roomsService.addRoom(newRoom);
      } else {
        alert('Room already exists');
      }
    }
    // clear data
    this.onClear();
  }


  editRoom(currentRoomId: number) {
    this.editRowId = currentRoomId;
    this.router.navigate(['/rooms-detail', currentRoomId], {relativeTo: this.route, queryParamsHandling: 'preserve'});
    this.roomsService.startedEditing.next(currentRoomId);
    // this.roomsService.updateRoom(currentRoomId);
  }

  deleteRoom(roomIndex: number) {
    this.roomsService.deleteRoom(roomIndex);
    this.router.navigate(['/rooms-detail'], {relativeTo: this.route, queryParamsHandling: 'preserve'});

  }

  saveRoom(modifiedRoom: Rooms) {

    if (this.updatedRoomIsValid()) {
      this.roomsService.saveRoom(modifiedRoom);
      this.editRowId = -1;
      this.router.navigate(['/rooms-detail'], {relativeTo: this.route, queryParamsHandling: 'preserve'});
    }
  }

  cancelSavedRoom(roomIndex) {
    console.log(this.editRowId, roomIndex);
    this.editRowId = -1;
    this.hideMenu();
  }


  // Sorting
  sortData(sort: Sort) {
    const data = this.rooms.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }
    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return compare(a.name, b.name, isAsc);
        case 'description':
          return compare(a.description, b.description, isAsc);
        case 'hospitalName':
          return compare(a.hospitalName, b.hospitalName, isAsc);
        case 'roomProtocolName':
          return compare(a.roomProtocolName, b.roomProtocolName, isAsc);
        case 'createdOn':
          return compare(a.createdOn, b.createdOn, isAsc);
        case 'status':
          return compare(a.status, b.status, isAsc);
        default:
          return 0;
      }
    });
  }

  onSorted($event: any) {
    console.log($event);
    this.sortData($event);
  }

  private hideMenu() {

  }

  // export to excel
  tableToExcel() {
    this.excelService.exportAsExcelFile(this.rooms, 'roomsSample');
  }

  onClear() {
    this.roomsForm.reset();

  }

  // Validations
  updatedRoomIsValid() {

    const updatedRoomValues = this.roomsForm.value;

    return updatedRoomValues.editedRoomName !== null &&
      updatedRoomValues.editedRoomDescription !== null &&
      updatedRoomValues.editedRoomProtocol !== null &&
      updatedRoomValues.editedStatus != null &&
      !this.roomExists(updatedRoomValues);
  }

  private roomExists(newRoom) {
    return this.rooms.some((el) => el.hospitalName === newRoom.hospitalName && el.name === newRoom.name);
  }
}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
