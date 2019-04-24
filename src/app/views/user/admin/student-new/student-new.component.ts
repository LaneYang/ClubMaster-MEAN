import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {User} from '../../../../models/user.model.client';
import {SharedService} from '../../../../services/shared.service';
import {UserService} from '../../../../services/user.service.client';

@Component({
  selector: 'app-student-new',
  templateUrl: './student-new.component.html',
  styleUrls: ['./student-new.component.css']
})
export class StudentNewComponent implements OnInit {

  @ViewChild('r') registerForm: NgForm;
  username: string;
  password: string;
  vpassword: string;
  firstName: string;
  lastName: string;
  email: string;
  type = 'STUDENT';

  student: User;

  errorFlag = false;
  errorMsg = 'Passwords mismatch!';

  constructor(private userService: UserService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  CreateStudent() {
    this.username = this.registerForm.value.username;
    this.password = this.registerForm.value.password;
    this.vpassword = this.registerForm.value.vpassword;
    this.firstName = this.registerForm.value.firstName;
    this.lastName = this.registerForm.value.lastName;
    this.email = this.registerForm.value.email;
    if (this.vpassword === this.password) {
      this.userService.register(this.username, this.password, this.type, this.firstName, this.lastName, this.email)
        .subscribe(
        (user: User) => {
          this.student = user;
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
  }

}
