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

  // clubs = [{name: 'CS5001', title: 'Racket', rating: 9.3, numRating: 3},
  //   {name: 'CS5002', title: 'Data Structure', rating: 9.0, numRating: 6},
  //   {name: 'CS5003', title: 'OOD', rating: 8.2, numRating: 2}];

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
