import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ClubService} from '../../../../services/club.service.client';
import {UserService} from '../../../../services/user.service.client';
import {SharedService} from '../../../../services/shared.service';
import {Club} from '../../../../models/club.model.client';

@Component({
  selector: 'app-club-edit',
  templateUrl: './club-edit.component.html',
  styleUrls: ['./club-edit.component.css']
})
export class ClubEditComponent implements OnInit {
  errorMsg = '';
  errorFlag: Boolean;
  userId: String;
  clubId: String;
  updatedClub: any = {};
  name: String;
  description: String;
  clubs: any[];
  club: Club;
  constructor(
    private clubService: ClubService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private sharedService: SharedService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getUser();
    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.clubService.findClubs(this.userId).subscribe(
          (clubs: any[]) => {
            this.clubs = clubs;
          });

        this.clubId = params['cid'];
        this.clubService.findClubById(this.clubId).subscribe(
          (club: any) => {
            this.updatedClub = club;
          }
        );
      });
  }

  updateClub(club) {
    this.errorFlag = false;
    this.errorMsg = '';
    if (club.name == null || club.name.trim() === '') {
      this.errorFlag = true;
      this.errorMsg = 'Club Name cannot be empty';
      return;
    }

    if (!this.errorFlag) {
      this.clubService.updateClub(this.clubId, club).subscribe(
        (club: any) => {
          this.updatedClub = club;
          this.router.navigate(['../'], {relativeTo: this.activatedRoute});
        },
        (error: any) => {
        }
      );
    }
  }

  deleteClub() {
    if (this.clubId != null && this.clubId.trim() !== '') {
      this.clubService.deleteClub(this.clubId).subscribe(
        (club: any) => {


          this.router.navigate(['../'], {relativeTo: this.activatedRoute});

        },
        (error: any) => {

        }
      );
    }
  }

  getUser() {
    this.userId = this.sharedService.user['_id'];
  }
}
