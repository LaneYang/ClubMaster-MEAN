import { Component, OnInit } from '@angular/core';
import {Club} from '../../../models/club.model.client';
import {Widget} from '../../../models/widget.model.client';
import {ActivatedRoute} from '@angular/router';
import {ClubService} from '../../../services/club.service.client';
import {WidgetService} from '../../../services/widget.service.client';

@Component({
  selector: 'app-widget-view',
  templateUrl: './widget-view.component.html',
  styleUrls: ['./widget-view.component.css']
})
export class WidgetViewComponent implements OnInit {
  widgets: Widget[];
  clubId: string;
  club: Club;

  constructor(private route: ActivatedRoute,
              private widgetService: WidgetService,
              private clubService: ClubService) {
    this.widgets = [];
    this.club = new Club(null, null, null, null, null, null, null);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.clubId = params['cid'];
      this.clubService.findClubById(this.clubId).subscribe(
        (club: Club) => {
          this.club = club;
        },
        (error: any) => console.log(error)
      );
      this.widgetService.findWidgetsByClubId(this.clubId).subscribe(
        (widgets: Widget[]) => {
          this.widgets = widgets;
        },
        (error: any) => console.log(error)
      );
    });
  }

}
