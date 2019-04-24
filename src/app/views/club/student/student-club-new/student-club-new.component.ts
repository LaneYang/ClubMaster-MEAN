import { Component, OnInit } from '@angular/core';
import {ClubService} from '../../../../services/club.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {SharedService} from '../../../../services/shared.service';
import {UserService} from '../../../../services/user.service.client';
import {User} from '../../../../models/user.model.client';
import {Club} from '../../../../models/club.model.client';

@Component({
  selector: 'app-student-club-new',
  templateUrl: './student-club-new.component.html',
  styleUrls: ['./student-club-new.component.css']
})
export class StudentClubNewComponent implements OnInit {

  errorFlag: boolean;
  errorMsg = '';
  userId: String;
  clubs: any[];
  user: User;
  clubName: String;
  clubId: String;
  club: Club;

  constructor(private clubService: ClubService,
              private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private sharedService: SharedService,
              private router: Router) { }

  ngOnInit() {
    this.userId = this.sharedService.user['_id'];
    this.userService.findUserById(this.userId).subscribe(
  (user: any) => {
        this.user = user;
       }
    );
  }

  createClub() {
    this.errorFlag = false;
    this.errorMsg = '';
    if (this.clubName == null || this.clubName === '') {
      this.errorMsg = 'Club Name cannot be empty';
      this.errorFlag = true;
      return;
    }

    this.clubService.findClubByName(this.clubName).subscribe(
      (club: any) => {
        this.club = club;
        if (this.club == null) {
          this.errorFlag = true;
          this.errorMsg = 'This club does not exist!';
        } else {
          this.errorFlag = false;
          this.userService.addClubForStudent(this.userId, this.club._id, this.user).subscribe(
            (user: any) => {
              this.router.navigate(['../'], {relativeTo: this.activatedRoute});
            }
          );
        }
      }
    );
  }

}
