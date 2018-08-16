import {RoomProtocol} from '../room-protocol.model';

export class Rooms {

  constructor( public roomProtocol: RoomProtocol,
               public id: number,
               public name: string,
               public description: string,
               public createdOn: DateTimeFormat,
               public createdBy: string,
               public modifiedOn: DateTimeFormat,
               public modifiedBy: string,
               public isActive: boolean
               ) {}
}
