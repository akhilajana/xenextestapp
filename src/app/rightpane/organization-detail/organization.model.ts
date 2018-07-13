
export class Organization {

  constructor(public organizationName: string,
              public organizationDescription: string,
              public evsProvider: string,
              public modifiedBy: string,
              public createdOn: string,
              public accountManager: string,
              public status: string,
              public organizationLevel: string,
              public parentOrganizations: string,
              public childOrganizations: string,
              public logicalDevices: string,
              public deviceLogs: string) {}
}
