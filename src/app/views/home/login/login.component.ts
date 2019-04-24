import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {environment} from '../../../../environments/environment';
import {Router} from '@angular/router';
import {SharedService} from '../../../services/shared.service';
import {UserService} from '../../../services/user.service.client';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('f') loginForm: NgForm;
  username: string;
  password: string;
  type = 'STUDENT';

  errorFlag = false;
  errorMsg = 'User does not exist!';
  baseUrl = environment.baseUrl;

  constructor(private userService: UserService,
              private router: Router,
              private sharedService: SharedService) {
  }

  login() {
    this.username = this.loginForm.value.username;
    this.password = this.loginForm.value.password;

    this.userService.login(this.username, this.password)
      .subscribe(
        (user: any) => {
          if (user.type !== this.type) {
            this.errorFlag = true;
            this.userService.logout();
          } else if (this.type === 'STUDENT') {
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
            this.userService.logout();
          }
        },
        (error: any) => {
          console.log(error);
          this.errorFlag = true;
        }
      );
  }

  ngOnInit() {
    // if already logged in, jump to dashboard.
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
