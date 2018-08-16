import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RoomsDetailComponent} from './rightpane/hospital-management/room-management/rooms-detail/rooms-detail.component';
import {PageNotFoundComponent} from './shared/page-not-found/page-not-found.component';
import {OrganizationDetailComponent} from './rightpane/organization-detail/organization-detail.component';
import {AppComponent} from './app.component';
import {RoomManagementComponent} from './rightpane/hospital-management/room-management/room-management.component';

const appRoutes: Routes = [
   // { path: '', component: AppComponent, pathMatch: 'full' },

  // Left pane routes
  { path: 'organization-detail', component: OrganizationDetailComponent },

  // Room Management routes
        {path: 'rooms-detail', component: RoomsDetailComponent, children: [
          {path: ':id', component: RoomsDetailComponent}
        ]},
      {path: 'room-lists', component: RoomsDetailComponent},
      {path: 'room-protocols', component: RoomsDetailComponent},
      {path: 'room-states', component: RoomsDetailComponent},
      {path: 'room-units', component: RoomsDetailComponent},
      {path: 'roomsList-bulk-upload', component: RoomsDetailComponent}



  //Not-found
  // {path: 'not-found', component: PageNotFoundComponent},
  // {path: '**', redirectTo: '/not-found'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {

}

export const routingComponents = [RoomsDetailComponent, OrganizationDetailComponent, PageNotFoundComponent]
