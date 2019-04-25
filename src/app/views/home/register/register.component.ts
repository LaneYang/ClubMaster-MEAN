import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../../../services/user.service.client';
import {Router} from '@angular/router';
import {User} from '../../../models/user.model.client';
import {SharedService} from '../../../services/shared.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @ViewChild('r') registerForm: NgForm;
  username: string;
  password: string;
  vpassword: string;
  firstName: string;
  lastName: string;
  email: string;
  type = 'STUDENT';

  errorFlag = false;
  errorMsg = 'Passwords mismatch!';

  constructor(private userService: UserService,
              private router: Router,
              private sharedService: SharedService) { }

  register() {
    this.username = this.registerForm.value.username;
    this.password = this.registerForm.value.password;
    this.vpassword = this.registerForm.value.vpassword;
    this.firstName = this.registerForm.value.firstName;
    this.lastName = this.registerForm.value.lastName;
    this.email = this.registerForm.value.email;

    if (this.vpassword === this.password) {
      this.userService.register(this.username, this.password, this.type, this.firstName, this.lastName, this.email).subscribe(
        (user: User) => {
          this.errorFlag = false;
          if (this.type === 'STUDENT') {
            this.sharedService.user = user;
            this.router.navigate(['/student']);
          } else if (this.type === 'PROFESSOR') {
            this.sharedService.user = user;
            this.router.navigate(['/founder']);
          } else if (this.type === 'ADMIN') {
            this.sharedService.user = user;
            this.router.navigate(['/admin']);
          } else {
            this.errorFlag = true;
          }
        },
        (error: any) => {
          console.log(error);
        }
      );
    } else {
      this.errorFlag = true;
    }
  }

  ngOnInit() {

    if (this.sharedService.user) {
      if (this.sharedService.user.type === 'STUDENT') {
        this.router.navigate(['/student']);
      } else if (this.sharedService.user.type === 'PROFESSOR') {
        this.router.navigate(['/founder']);
      } else if (this.sharedService.user.type === 'ADMIN') {
        this.router.navigate(['/admin']);
      } else {
        this.errorFlag = true;
        this.userService.logout();
        this.sharedService.user = null;
      }
    }
  }

}
