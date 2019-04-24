import {Component, OnInit} from '@angular/core';
import {ClubService} from '../../../../services/club.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {SharedService} from '../../../../services/shared.service';
import {Club} from '../../../../models/club.model.client';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  errorFlag: boolean;
  errorMsg = '';
  userId: String;
  clubId: String;
  clubs: any[];
  club: Club;
  rating: Number;

  constructor(private clubService: ClubService,
              private activatedRoute: ActivatedRoute,
              private sharedService: SharedService,
              private router: Router) {
    this.club = new Club(null, null, null, null, 0, 0, 0);
  }

  ngOnInit() {
    this.getUser();
    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.clubId = params['cid'];
        this.clubService.findClubById(this.clubId).subscribe(
          (club: Club) => {
            this.club = club;
          }
        );
      });
  }

  getUser() {
    this.userId = this.sharedService.user['_id'];
  }

  updateClub() {
    this.clubService.findClubById(this.clubId).subscribe(
      (club: Club) => {
        this.club = club;
        this.club.numRating = this.club.numRating.valueOf() + 1;
        this.club.sumRating = this.club.sumRating.valueOf() + (+this.rating);
        this.club.rating = this.club.sumRating.valueOf() / this.club.numRating.valueOf();
        this.club.rating = Math.round(+this.club.rating.valueOf() * 100) / 100;

        this.clubService.updateClub(this.clubId, this.club).subscribe(
          (club: any) => {
            this.router.navigate(['../'], {relativeTo: this.activatedRoute});
          },
        );
      }
    );
  }
}
