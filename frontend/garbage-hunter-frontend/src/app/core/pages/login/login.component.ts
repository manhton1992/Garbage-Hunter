import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';
import { FlashService } from 'src/app/services/flash/flash.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  /**
   * @description flash message
   */
  flash: any = this.flashService.getFlashes();

  /**
   * @description type for password input (for show/hide password)
   */
  passwordType = 'password';

  /**
   * @description show/hide password text
   */
  passwordShow = false;

  /**
   * @description logged in user object
   */
  userLogin = {
    email: '',
    password: '',
  };

  constructor(public userService: UserService, public router: Router, public flashService: FlashService) {}

  ngOnInit() {}

  submitLogin() {
    this.userService.login(this.userLogin.email, this.userLogin.password).subscribe(
      (response) => {
        const user = {
          token: response.token,
        };
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.removeItem('currentUser');
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.userService.user = response.docs;
        this.flashService.setFlashSuccess(`welcome back, ${response.docs.email}!`);
        this.router.navigate(['/']);
      },
      (error) => {
        this.flashService.setErrorFlash(`wrong email or password!`);
        this.flash = this.flashService.getFlashes();
      }
    );
  }
  public togglePassword() {
    if (this.passwordShow) {
      this.passwordShow = false;
      this.passwordType = 'password';
    } else {
      this.passwordShow = true;
      this.passwordType = 'text';
    }
  }
}
