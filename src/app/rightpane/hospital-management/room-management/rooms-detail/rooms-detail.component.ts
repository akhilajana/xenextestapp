import {Component, ElementRef, NgModule, OnInit, ViewChild} from '@angular/core';
import {Rooms} from './rooms.model';
import {RoomsService} from './rooms.service';
import {Sort} from '@angular/material';
import {ExcelService} from '../../../../shared/exportasExcel.service';
import {ActivatedRoute, Data, Params, Router} from '@angular/router';
import {NgForm} from '@angular/forms';


@Component({
  selector: 'app-rooms-detail',
  templateUrl: './rooms-detail.component.html',
  styleUrls: ['./rooms-detail.component.css']
})


export class RoomsDetailComponent implements OnInit {

  @ViewChild('newRoomData') newRoomDetails: NgForm;
  @ViewChild('roomName') roomNameRef: ElementRef;
  @ViewChild('roomDescription') roomDescriptionRef: ElementRef;
  @ViewChild('hospitalName') hospitalNameRef: ElementRef;
  @ViewChild('roomProtocolName') roomProtocolNameRef: ElementRef;
  @ViewChild('createdDate') createdDateRef: ElementRef;
  @ViewChild('status') statusRef: ElementRef;

  room: Rooms;
  rooms: Rooms[];
  sortedData: Rooms[];
  isEditable: boolean = false;
  editRowId: any = '';

  constructor(private roomsService: RoomsService,
              private excelService: ExcelService,
              private route: ActivatedRoute,
              private router: Router) {

  }


  ngOnInit() {
     // this.rooms = this.roomsService.getRooms();
    this.roomsService.getFromServer()
      .subscribe(
          // console.log('get servers data in Init');
          // console.log(rooms);
          res => {
            this.rooms = res;
            console.log('get server data');
            console.log(this.rooms);
          }

      );
    console.log('Init 3' + this.rooms);
    // this.sortedData = this.rooms.slice();
    this.roomsService.roomsChanged.subscribe(
      (rooms: Rooms[]) => {
        this.rooms = rooms;
      }
    );
    console.log('Init 1' + this.rooms);

    this.route.params
      .subscribe(
        (params: Params) => {
          this.room = this.roomsService.getRoomById(+params['id']);
        }
      );
    console.log('Init 2' + this.room);



  }

  // Methods
  addRoom() {
    const newRoomId = this.roomsService.generateNewRoomId();
    const newRoomName = this.roomNameRef.nativeElement.value;
    const newRoomDescription = this.roomDescriptionRef.nativeElement.value;
    const newHospitalName = this.hospitalNameRef.nativeElement.value;
    const newProtocolName = this.roomProtocolNameRef.nativeElement.value;
    const newCreatedDate = this.createdDateRef.nativeElement.value;
    const newStatus = this.statusRef.nativeElement.value;

    const newRoom = new Rooms(newRoomId, newRoomName, newRoomDescription, newHospitalName, newProtocolName, newCreatedDate, newStatus, null);
    console.log('addmenthod');
    console.log(this.newRoomDetails);
    //check if inputs are null
    this.roomsService.addRoom(newRoom);
    this.roomsService.putToServer(this.rooms)
      .subscribe(
        (repsonse) => console.log(repsonse)
      );
    this.clearTextFields();
  }

  editRoom(roomId: number) {

    this.editRowId = roomId;
    this.router.navigate(['/rooms-detail', roomId], {relativeTo: this.route, queryParamsHandling: 'preserve'});
    this.roomsService.editRoom(roomId);
  /*  if (true) {
      // save
      this.saveRoom(roomId);
    } else {
      // cancel
      this.cancelSavedRoom(roomId);
    }*/
  }

  deleteRoom(roomId: number) {
    console.log(roomId);
    this.roomsService.deleteRoom(roomId);
    this.router.navigate(['/rooms-detail', roomId], {relativeTo: this.route, queryParamsHandling: 'preserve'});

  }

  saveRoom(modifiedRoom: Rooms) {

    this.roomsService.saveRoom(modifiedRoom);
    this.roomsService.putToServer(this.rooms)
      .subscribe(
        (repsonse) => console.log(repsonse)
      );
    console.log('save' + modifiedRoom);
    this.editRowId = -1;
    this.router.navigate(['/rooms-detail', modifiedRoom.roomId], {relativeTo: this.route, queryParamsHandling: 'preserve'});
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
        case 'roomName':
          return compare(a.roomName, b.roomName, isAsc);
        case 'roomDescription':
          return compare(a.roomDescription, b.roomDescription, isAsc);
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

  private clearTextFields() {
    this.roomNameRef.nativeElement.value = '';
    this.roomDescriptionRef.nativeElement.value = '';
    this.hospitalNameRef.nativeElement.value = '';
    this.roomProtocolNameRef.nativeElement.value = '';
    this.createdDateRef.nativeElement.value = '';
    this.statusRef.nativeElement.value = '';
  }

  private hideMenu() {

  }

  tableToExcel() {
    this.excelService.exportAsExcelFile(this.rooms, 'roomsSample');
  }


}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
