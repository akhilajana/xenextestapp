import {Component, ElementRef, NgModule, OnInit, ViewChild} from '@angular/core';
import {Rooms} from './rooms.model';
import {RoomsService} from './rooms.service';
import {ExcelService} from '../../../../shared/exportasExcel.service';
import {ActivatedRoute, Data, Params, Router, RouterStateSnapshot} from '@angular/router';
import {NgForm} from '@angular/forms';
import {RoomProtocol} from '../room-protocol.model';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-rooms-detail',
  templateUrl: './rooms-detail.component.html',
  styleUrls: ['./rooms-detail.component.css']
})


export class RoomsDetailComponent implements OnInit {

  @ViewChild('roomsData') roomsForm: NgForm;

  roomsList: Rooms[] = [];
  sortedData: Rooms[];
  isEditable = false;
  editRowId: any = '';

  constructor(private roomsService: RoomsService,
              private excelService: ExcelService,
              private route: ActivatedRoute,
              private router: Router) {

  }


  ngOnInit(): any {

    this.roomsList = this.roomsService.getRoomsByOrganizationId(267175);
    console.log(this.roomsList);
    this.sortedData = this.roomsList.slice();
    this.roomsService.roomsChanged.subscribe(
      (rooms: Rooms[]) => {
        this.roomsList = rooms;
      }
    );
  }

  // CRUD Operations
  addRoom(newRoomForm: NgForm) {

    const newRoomValues = newRoomForm.value;

    const newRoom = new Rooms(new RoomProtocol(null, newRoomValues.newRoomProtocolName, null, null, null, null, null, null, null, null, null),
                              -1,
                              newRoomValues.newRoomName,
                              newRoomValues.newRoomDescription,
                              newRoomValues.newCreatedDate,
                              'test user',
                              newRoomValues.modifiedOn,
                              'test user 2',
                              newRoomValues.newStatus);

    // check if room already exists
    if (this.roomsList == null) {
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

  deleteRoom(roomIndex: number, roomId: number) {
    this.roomsService.deleteRoom(roomIndex, roomId);
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
 /* sortData(sort: Sort) {
    const data = this.roomsList.slice();
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
        /!*case 'hospitalName':
          return compare(a.hospitalName, b.hospitalName, isAsc);
        case 'roomProtocolName':
          return compare(a.roomProtocolName, b.roomProtocolName, isAsc);*!/
        case 'createdOn':
          return compare(a.createdOn, b.createdOn, isAsc);
        case 'status':
          return compare(a.isActive, b.isActive, isAsc);
        default:
          return 0;
      }
    });*/


  onSorted($event: any) {
    console.log($event);
    // this.sortData($event);
  }

  private hideMenu() {

  }

  // export to excel
  tableToExcel() {
    this.excelService.exportAsExcelFile(this.roomsList, 'roomsSample');
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
    return this.roomsList.some((el) => /*el.hospitalName === newRoom.hospitalName &&*/ el.name === newRoom.name);
  }
}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
