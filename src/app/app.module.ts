import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { OrganizationsComponent } from './leftpane/organizations/organizations.component';
import { AdministrationComponent } from './leftpane/administration/administration.component';
import { ReportsComponent } from './rightpane/reports/reports.component';
import { HospitalManagementComponent } from './rightpane/hospital-management/hospital-management.component';
import { HeaderComponent } from './header/header.component';
import { LeftpaneComponent } from './leftpane/leftpane.component';
import { RightpaneComponent } from './rightpane/rightpane.component';
import { OrganizationDetailComponent } from './rightpane/organization-detail/organization-detail.component';
import { RoomsDetailComponent } from './rightpane/hospital-management/rooms-detail/rooms-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    OrganizationsComponent,
    AdministrationComponent,
    ReportsComponent,
    HospitalManagementComponent,
    HeaderComponent,
    LeftpaneComponent,
    RightpaneComponent,
    OrganizationDetailComponent,
    RoomsDetailComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
