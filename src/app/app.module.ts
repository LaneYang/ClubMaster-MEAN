import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { provideRoutes } from '@angular/router';


import { AppComponent } from './app.component';
import { LoginComponent } from './views/home/login/login.component';
import {routing} from './app.routing';

import { HomeComponent } from './views/home/home/home.component';
import { RegisterComponent } from './views/home/register/register.component';
import { StudentClubListComponent } from './views/club/student/student-club-list/student-club-list.component';
import { WidgetListComponent } from './views/widget/widget-list/widget-list.component';
import {StudentClubNewComponent} from './views/club/student/student-club-new/student-club-new.component';
import {RatingComponent} from './views/club/student/rating/rating.component';
import {FounderClubNewComponent} from './views/club/founder/founder-club-new/founder-club-new.component';
import {FounderClubListComponent} from './views/club/founder/founder-club-list/founder-club-list.component';
import {ClubEditComponent} from './views/club/founder/club-edit/club-edit.component';
import { TopClubsComponent } from './views/home/top-clubs/top-clubs.component';
import {SharedService} from './services/shared.service';
import {UserService} from './services/user.service.client';
import {FormsModule} from '@angular/forms';
import {AuthGuard} from './services/auth-guard.service';
import {HttpModule} from '@angular/http';
import { FounderDashboardComponent } from './views/user/founder/founder-dashboard/founder-dashboard.component';
import { StudentDashboardComponent } from './views/user/student/student-dashboard/student-dashboard.component';
import {AdminDashboardComponent} from './views/user/admin/admin-dashboard/admin-dashboard.component';
import {FounderNewComponent} from './views/user/admin/founder-new/founder-new.component';
import {FounderEditComponent} from './views/user/admin/founder-edit/founder-edit.component';
import {StudentEditComponent} from './views/user/admin/student-edit/student-edit.component';
import {StudentNewComponent} from './views/user/admin/student-new/student-new.component';
import {ClubService} from './services/club.service.client';
import { AdminEditComponent } from './views/user/admin/admin-edit/admin-edit.component';
import { WidgetChooserComponent } from './views/widget/widget-chooser/widget-chooser.component';
import { WidgetEditComponent } from './views/widget/widget-edit/widget-edit.component';
import { WidgetHeaderComponent } from './views/widget/widget-edit/widget-header/widget-header.component';
import { WidgetHtmlComponent } from './views/widget/widget-edit/widget-html/widget-html.component';
import { WidgetImageComponent } from './views/widget/widget-edit/widget-image/widget-image.component';
import { WidgetYoutubeComponent } from './views/widget/widget-edit/widget-youtube/widget-youtube.component';
import { WidgetViewComponent } from './views/widget/widget-view/widget-view.component';
import {SortableDirective} from './directives/sortable.directive';
import {SafePipe} from './pipes/safe.pipe';
import {WidgetService} from './services/widget.service.client';
import { QuillEditorModule } from 'ngx-quill-editor';
import { FlickrImageSearchComponent } from './views/widget/widget-edit/widget-image/flickr-image-search/flickr-image-search.component';
import {FlickrService} from './services/flickr.service.client';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminDashboardComponent,
    FounderNewComponent,
    HomeComponent,
    RegisterComponent,
    StudentClubListComponent,
    FounderClubListComponent,
    FounderClubNewComponent,
    ClubEditComponent,
    StudentClubNewComponent,
    RatingComponent,
    TopClubsComponent,
    FounderEditComponent,
    FounderNewComponent,
    StudentEditComponent,
    StudentNewComponent,
    FounderDashboardComponent,
    StudentDashboardComponent,
    AdminEditComponent,
    WidgetListComponent,
    WidgetChooserComponent,
    WidgetEditComponent,
    WidgetHeaderComponent,
    WidgetHtmlComponent,
    WidgetImageComponent,
    WidgetYoutubeComponent,
    WidgetViewComponent,
    SafePipe,
    SortableDirective,
    FlickrImageSearchComponent,
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpModule,
    QuillEditorModule
  ],
  providers: [UserService, ClubService, SharedService, AuthGuard, WidgetService, FlickrService],
  bootstrap: [AppComponent]
})
export class AppModule { }
