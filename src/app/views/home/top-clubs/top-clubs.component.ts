import { Component, OnInit } from '@angular/core';
import {ClubService} from '../../../services/club.service.client';
import {SharedService} from '../../../services/shared.service';
import {ActivatedRoute} from '@angular/router';
import {Club} from '../../../models/club.model.client';

@Component({
  selector: 'app-top-clubs',
  templateUrl: './top-clubs.component.html',
  styleUrls: ['./top-clubs.component.css']
})
export class TopClubsComponent implements OnInit {
  clubs: Club[];





  constructor(private clubService: ClubService) {
    this.clubs = [];
  }

  ngOnInit() {
      this.clubService.topClubs().subscribe(
        (clubs: Club[]) => {
          this.clubs = clubs;
        },
        (error: any) => console.log(error)
      );
  }

}
