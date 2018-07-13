import { Component, OnInit } from '@angular/core';
import {Organization} from './organization.model';

@Component({
  selector: 'app-organization-detail',
  templateUrl: './organization-detail.component.html',
  styleUrls: ['./organization-detail.component.css']
})
export class OrganizationDetailComponent implements OnInit {

  organizations: Organization[] = [
    new Organization
    (
      'test',
      'testdesc',
      'testprovider',
      'testDate',
      'testDate',
      'testMgr',
      'testStatus',
      'testOrganizationLevel',
      'testParent',
      'testChild',
      'testDevice',
      'testLog'
    )];

  constructor() { }

  ngOnInit() {
  }

}
