import { Component, OnInit } from '@angular/core';
import {ClubService} from '../../../../services/club.service.client';
import {ActivatedRoute} from '@angular/router';
import {SharedService} from '../../../../services/shared.service';
import {Club} from '../../../../models/club.model.client';
import {UserService} from '../../../../services/user.service.client';

@Component({
  selector: 'app-student-club-list',
  templateUrl: './student-club-list.component.html',
  styleUrls: ['./student-club-list.component.css']
})
export class StudentClubListComponent implements OnInit {

  userId: String;
  clubs: Club[];

  constructor(private userService: UserService,
              private clubService: ClubService,
              private activatedRoute: ActivatedRoute,
              private sharedService: SharedService) { }

  ngOnInit() {
    this.userId = this.sharedService.user['_id'];
    this.userService.findClubsByUser(this.userId).subscribe(
  (clubs: Club[]) => {
          this.clubs = clubs;
        }
    );
  }

  deleteClubForStudent(clubId) {
    this.userService.deleteClubForStudent(this.userId, clubId).subscribe(
      () => {
        this.ngOnInit();
      }
    );
  }

}
