import {Component, OnInit, ViewChild} from '@angular/core';
import {ClubService} from '../../../../services/club.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {SharedService} from '../../../../services/shared.service';
import {NgForm} from '@angular/forms';
import {Club} from '../../../../models/club.model.client';

@Component({
  selector: 'app-founder-club-new',
  templateUrl: './founder-club-new.component.html',
  styleUrls: ['./founder-club-new.component.css']
})
export class FounderClubNewComponent implements OnInit {
  @ViewChild('f') clubForm: NgForm;
  errorFlag: boolean;
  errorMsg = '';
  userId: String;
  clubs: any[];
  newClub: Club;
  clubName: String;
  clubTitle: String;

  constructor(private clubService: ClubService,
              private activatedRoute: ActivatedRoute,
              private sharedService: SharedService,
              private router: Router) { }

  ngOnInit() {
    this.userId = this.sharedService.user['_id'];
    this.clubService.findClubs(this.userId).subscribe(
      (clubs: any[]) => {
        this.clubs = clubs;
      }
    );
  }

  createClub() {
    this.errorFlag = false;
    this.errorMsg = '';
    this.clubName = this.clubForm.value.name;
    this.clubTitle = this.clubForm.value.title;

    if (this.clubName == null || this.clubName.trim() === '') {
      this.errorMsg = 'Club Name cannot be empty';
      this.errorFlag = true;
      return;
    }

    this.clubService.findClubByName(this.clubName).subscribe(
      (club: any) => {
        this.newClub = club;
        if (this.newClub != null) {
          this.errorFlag = true;
          this.errorMsg = 'This club has already existed!';
        } else {
          this.errorFlag = false;
          this.newClub = new Club(undefined, this.clubName, undefined, this.clubTitle, 0, 0, 0);
          this.clubService.createClub(this.userId, this.newClub).subscribe(
            (club: any) => {
              this.router.navigate(['../'], {relativeTo: this.activatedRoute});
            },
            (error: any) => {
              // Place an error message here
            }
          );
        }
      }
    );
  }
}
