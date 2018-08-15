import {RoomProtocol} from '../room-protocol.model';

export class Rooms {

  /*public isEditable = false;
  public updateRoom: string;*/


  constructor( public roomProtocol: RoomProtocol,
               public id: number,
               public name: string,
               public description: string,
               public hospitalName: string,
               public roomProtocolName: string,
               public createdOn: Date,
               public status: boolean
               ) {}
}
