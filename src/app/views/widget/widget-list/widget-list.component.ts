import { Component, OnInit } from '@angular/core';
import {Widget} from '../../../models/widget.model.client';
import {WidgetService} from '../../../services/widget.service.client';
import {ActivatedRoute} from '@angular/router';
import {Club} from '../../../models/club.model.client';
import {ClubService} from '../../../services/club.service.client';

@Component({
  selector: 'app-widget-list',
  templateUrl: './widget-list.component.html',
  styleUrls: ['./widget-list.component.css']
})
export class WidgetListComponent implements OnInit {
  widgets: Widget[];
  clubId: string;
  club: Club;

  constructor(private route: ActivatedRoute,
              private widgetService: WidgetService,
              private clubService: ClubService) {
    this.club = new Club(null, null, null,
      null, null, null, null);
    this.widgets = [];
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

  reorderWidgets(indexes) {
    this.widgetService.reorderWidgetsInServer(this.clubId, indexes).subscribe(
      () => {},
      (error: any) => console.log(error)
    );
  }

}
