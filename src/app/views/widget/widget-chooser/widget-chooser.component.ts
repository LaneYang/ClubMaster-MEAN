import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WidgetService} from '../../../services/widget.service.client';
import {ClubService} from '../../../services/club.service.client';
import {Club} from '../../../models/club.model.client';
import {Widget} from '../../../models/widget.model.client';

@Component({
  selector: 'app-widget-chooser',
  templateUrl: './widget-chooser.component.html',
  styleUrls: ['./widget-chooser.component.css']
})
export class WidgetChooserComponent implements OnInit {
  clubId: string;
  club: Club;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private widgetService: WidgetService,
    private clubService: ClubService) {
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
    });
  }

  createWidget(type: string) {
    let widget = new Widget(null, type, this.clubId, null, null, null);
    this.widgetService.createWidget(this.clubId, widget).subscribe(
      (data: Widget) => {
        widget = data;
        this.router.navigate(['../', widget._id], { relativeTo: this.route });
      },
      (error: any) => console.log(error)
    );
  }


}
