import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {LoginComponent} from './views/home/login/login.component';
import {HomeComponent} from './views/home/home/home.component';
import {RegisterComponent} from './views/home/register/register.component';
import {ClubEditComponent} from './views/club/founder/club-edit/club-edit.component';
import {FounderClubListComponent} from './views/club/founder/founder-club-list/founder-club-list.component';
import {FounderClubNewComponent} from './views/club/founder/founder-club-new/founder-club-new.component';
import {RatingComponent} from './views/club/student/rating/rating.component';
import {StudentClubListComponent} from './views/club/student/student-club-list/student-club-list.component';
import {StudentClubNewComponent} from './views/club/student/student-club-new/student-club-new.component';
import {TopClubsComponent} from './views/home/top-clubs/top-clubs.component';
import {StudentDashboardComponent} from './views/user/student/student-dashboard/student-dashboard.component';
import {FounderDashboardComponent} from './views/user/founder/founder-dashboard/founder-dashboard.component';
import {AdminDashboardComponent} from './views/user/admin/admin-dashboard/admin-dashboard.component';
import {StudentEditComponent} from './views/user/admin/student-edit/student-edit.component';
import {FounderEditComponent} from './views/user/admin/founder-edit/founder-edit.component';
import {StudentNewComponent} from './views/user/admin/student-new/student-new.component';
import {FounderNewComponent} from './views/user/admin/founder-new/founder-new.component';
import {AuthGuard} from './services/auth-guard.service';
import {AdminEditComponent} from './views/user/admin/admin-edit/admin-edit.component';
import {WidgetViewComponent} from './views/widget/widget-view/widget-view.component';
import {WidgetListComponent} from './views/widget/widget-list/widget-list.component';
import {WidgetChooserComponent} from './views/widget/widget-chooser/widget-chooser.component';
import {WidgetEditComponent} from './views/widget/widget-edit/widget-edit.component';
import {FlickrImageSearchComponent} from './views/widget/widget-edit/widget-image/flickr-image-search/flickr-image-search.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'student', component: StudentDashboardComponent, canActivate: [AuthGuard]},
  {path: 'founder', component: FounderDashboardComponent, canActivate: [AuthGuard]},
  {path: 'admin', component: AdminDashboardComponent, canActivate: [AuthGuard]},
  {path: 'admin/edit', component: AdminEditComponent, canActivate: [AuthGuard]},
  {path: 'admin/student', component: StudentEditComponent, canActivate: [AuthGuard]},
  {path: 'admin/founder', component: FounderEditComponent, canActivate: [AuthGuard]},
  {path: 'admin/student/new', component: StudentNewComponent, canActivate: [AuthGuard]},
  {path: 'admin/founder/new', component: FounderNewComponent, canActivate: [AuthGuard]},
  {path: 'student/clubs', component: StudentClubListComponent, canActivate: [AuthGuard]},
  {path: 'founder/clubs', component: FounderClubListComponent, canActivate: [AuthGuard]},
  {path: 'student/clubs/new', component: StudentClubNewComponent, canActivate: [AuthGuard]},
  {path: 'founder/clubs/new', component: FounderClubNewComponent, canActivate: [AuthGuard]},
  {path: 'founder/clubs/:cid', component: ClubEditComponent, canActivate: [AuthGuard]},
  {path: 'student/clubs/:cid', component: RatingComponent, canActivate: [AuthGuard]},
  {path: 'topclubs', component: TopClubsComponent},
  {path: 'student/clubs/:cid/widget', component: WidgetViewComponent, canActivate: [AuthGuard]},
  {path: 'founder/clubs/:cid/widget', component: WidgetListComponent, canActivate: [AuthGuard]},
  {path: 'founder/clubs/:cid/widget/new', component: WidgetChooserComponent, canActivate: [AuthGuard]},
  {path: 'founder/clubs/:cid/widget/:wgid', component: WidgetEditComponent, canActivate: [AuthGuard]},
  {path: 'founder/clubs/:cid/widget/:wgid/flickr', component: FlickrImageSearchComponent, canActivate: [AuthGuard]}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
