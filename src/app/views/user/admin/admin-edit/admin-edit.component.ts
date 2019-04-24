import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../../services/user.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {SharedService} from '../../../../services/shared.service';
import {User} from '../../../../models/user.model.client';

@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-edit.component.html',
  styleUrls: ['./admin-edit.component.css']
})
export class AdminEditComponent implements OnInit {
  user: User;

  constructor(private userService: UserService,
              private router: Router,
              private sharedService: SharedService,
              private activatedRoute: ActivatedRoute) { }

  updateUser(userId, changed_user) {
    return this.userService.updateUserInServer(userId, changed_user).subscribe(
      () => {
        // this.router.navigate(['../'], {relativeTo: this.activatedRoute});
        this.ngOnInit();
      }
    );
  }

  deleteUser(userId) {
    return this.userService.deleteUserInServer(userId).subscribe(
      () => {
        this.sharedService.user = null;
        this.router.navigate(['/login']);
      }
    );
  }

  ngOnInit() {
    this.user = this.sharedService.user;
  }

}
