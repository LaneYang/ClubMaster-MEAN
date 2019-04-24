import { Component, OnInit } from '@angular/core';
import {User} from '../../../../models/user.model.client';
import {SharedService} from '../../../../services/shared.service';
import {UserService} from '../../../../services/user.service.client';
import {Router} from '@angular/router';

@Component({
  selector: 'app-founder-dashboard',
  templateUrl: './founder-dashboard.component.html',
  styleUrls: ['./founder-dashboard.component.css']
})
export class FounderDashboardComponent implements OnInit {
  user: User;

  constructor(private userService: UserService,
              private sharedService: SharedService,
              private router: Router) { }

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
