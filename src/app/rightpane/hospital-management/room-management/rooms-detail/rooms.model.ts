export class Rooms {

  public isEditable : boolean = false;

  constructor( public roomId: number,
               public roomName: string,
               public roomDescription: string,
               public hospitalName: string,
               public roomProtocolName: string,
               public createdOn: string,
               public status: string,
               public editRoom: string) {}
}
