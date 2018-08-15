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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {DropdownDirective} from './shared/dropdown.directive';
import { SortableColumnComponent } from './shared/sortable-column/sortable-column.component';
import { SortedTableDirective } from './shared/sortable-column/sorted-table.directive';
import {ExcelService} from './shared/exportasExcel.service';
import {AppRoutingModule, routingComponents} from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RoomManagementComponent } from './rightpane/hospital-management/room-management/room-management.component';
import { TableComponentComponent } from './shared/table-component/table-component.component';
import {HttpModule} from '@angular/http';
import { FilterRoomsPipe } from './shared/filter-rooms.pipe';
import { SortRoomsPipe } from './shared/sort-rooms.pipe';


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
    DropdownDirective,
    SortableColumnComponent,
    SortedTableDirective,
    routingComponents,
    RoomManagementComponent,
    TableComponentComponent,
    FilterRoomsPipe,
    SortRoomsPipe,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpModule
  ],
  providers: [ExcelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
