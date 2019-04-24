import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {SharedService} from '../../../../services/shared.service';
import {UserService} from '../../../../services/user.service.client';
import {User} from '../../../../models/user.model.client';

@Component({
  selector: 'app-founder-new',
  templateUrl: './founder-new.component.html',
  styleUrls: ['./founder-new.component.css']
})
export class FounderNewComponent implements OnInit {
  @ViewChild('r') registerForm: NgForm;
  username: string;
  password: string;
  vpassword: string;
  firstName: string;
  lastName: string;
  email: string;
  type = 'PROFESSOR';

  founder: User;
  user: User;

  errorFlag = false;
  errorMsg = 'Passwords mismatch!';

  constructor(private userService: UserService,
              private router: Router,
              private sharedService: SharedService,
              private activatedRoute: ActivatedRoute) { }

  CreateFounder() {
    this.username = this.registerForm.value.username;
    this.password = this.registerForm.value.password;
    this.vpassword = this.registerForm.value.vpassword;
    this.firstName = this.registerForm.value.firstName;
    this.lastName = this.registerForm.value.lastName;
    this.email = this.registerForm.value.email;
    if (this.vpassword === this.password) {
      this.userService.register(this.username, this.password, this.type, this.firstName, this.lastName, this.email).subscribe(
        (user: User) => {
          this.founder = user;
          this.errorFlag = false;
          this.router.navigate(['../'], {relativeTo: this.activatedRoute});
          },
        (error: any) => {
          console.log(error);
        });
    } else {
      this.errorFlag = true;
    }
  }
  ngOnInit() {
    this.user = this.sharedService.user;
  }

}
