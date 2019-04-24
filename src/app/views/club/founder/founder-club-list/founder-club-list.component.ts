import { Component, OnInit } from '@angular/core';
import {Club} from '../../../../models/club.model.client';
import {ClubService} from '../../../../services/club.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {SharedService} from '../../../../services/shared.service';
import {UserService} from '../../../../services/user.service.client';

@Component({
  selector: 'app-founder-club-list',
  templateUrl: './founder-club-list.component.html',
  styleUrls: ['./founder-club-list.component.css']
})
export class FounderClubListComponent implements OnInit {

  userId: String;
  clubs: Club[];

  constructor(private clubService: ClubService,
              private activatedRoute: ActivatedRoute,
              private sharedService: SharedService) { }

  ngOnInit() {
    this.userId = this.sharedService.user['_id'];
    return this.clubService.findClubs(this.userId).subscribe(
      (clubs: Club[]) => {
        this.clubs = clubs;
      }
    );
  }

  deleteClub(clubId: string) {
    this.clubService.deleteClub(clubId).subscribe(
      (club: any) => {
        this.ngOnInit();
      },
      (error: any) => {
        // Place error message;
      }
    );
  }
}
