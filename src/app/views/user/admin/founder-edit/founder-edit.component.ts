import { Component, OnInit } from '@angular/core';
import {User} from '../../../../models/user.model.client';
import {ActivatedRoute, Router} from '@angular/router';
import {SharedService} from '../../../../services/shared.service';
import {UserService} from '../../../../services/user.service.client';

@Component({
  selector: 'app-founder-edit',
  templateUrl: './founder-edit.component.html',
  styleUrls: ['./founder-edit.component.css']
})
export class FounderEditComponent implements OnInit {
  user: User;
  founders: User[];
  modalFlag: boolean;

  constructor(private router: Router,
              private sharedService: SharedService,
              private userService: UserService) {

    this.user = new User(null, null, null, null, null, null, null);
    this.founders = [];
  }

  deleteUser(userId) {
    return this.userService.deleteUserInServer(userId).subscribe(
      () => {

        this.ngOnInit();
      }
    );
  }

  findUserById(userId) {
    this.userService.findUserById(userId).subscribe(
      (user: User) => {
        this.user = user;
      }
    );
    if (this.user) {
      this.modalFlag = true;
    }
  }

  updateUser(userId, changed_user) {
    return this.userService.updateUserInServer(userId, changed_user).subscribe(
      () => {
        this.ngOnInit();
      }
    );
  }

  ngOnInit() {
    this.userService.findAllFounders().subscribe(
      (founders: User[]) => {
        this.founders = founders;
      }
    );
  }

}
