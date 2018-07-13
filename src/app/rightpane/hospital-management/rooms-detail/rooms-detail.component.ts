import { Component, OnInit } from '@angular/core';
import {Rooms} from './rooms.model';

@Component({
  selector: 'app-rooms-detail',
  templateUrl: './rooms-detail.component.html',
  styleUrls: ['./rooms-detail.component.css']
})
export class RoomsDetailComponent implements OnInit {

  rooms: Rooms[] = [
    new Rooms(
      'test',
      'testDesc',
      'testHosp',
      'testProtocol',
      'testDate',
      'testStatus',
      'testEdit'
    )
  ];

  constructor() { }

  ngOnInit() {
  }

}
