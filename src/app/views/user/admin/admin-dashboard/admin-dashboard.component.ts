import { Component, OnInit } from '@angular/core';
import {User} from '../../../../models/user.model.client';
import {Router} from '@angular/router';
import {SharedService} from '../../../../services/shared.service';
import {UserService} from '../../../../services/user.service.client';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  user: User;

  constructor(private userService: UserService,
              private sharedService: SharedService,
              public router: Router) { }
  logout() {
    this.sharedService.user = null;
    this.userService.logout()
      .subscribe(
        (data: any) => this.router.navigate(['/login'])
      );
  }

  ngOnInit() {
    this.user = this.sharedService.user;
  }

}
