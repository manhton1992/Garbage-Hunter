import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';
import { FlashService } from 'src/app/services/flash/flash.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  /**
   * @description flash message
   * @type {*}
   * @memberof RegisterComponent
   */
  flash: any = this.flashService.getFlashes();

  userRegister = {
    email: '',
    password: '',
  };
  passwordType: string = 'password';
  passwordShow: boolean = false;

  passwordConfirm: String = '';
  
  constructor(
    public userService: UserService, 
    public router: Router, 
    public flashService: FlashService
    ) {}

  ngOnInit() {}

  submitRegister() {
    if (
      this.userRegister.email != '' &&
      this.userRegister.password != '' &&
      this.passwordConfirm.trim() == this.userRegister.password.trim()
    ) {
      this.userService.register(this.userRegister).subscribe(
        (res) => {
          // console.log(res);
          this.flashService.setFlashSuccess('register success! please confirm email to use your account!');
          this.router.navigate(['/login']);
        },
        (error) => {
          this.flashService.setErrorFlash('email address is already registered!');
          this.flash = this.flashService.getFlashes();
        }
      );
    } else {
      this.flashService.setErrorFlash('Passwords do not match!');
      this.flash = this.flashService.getFlashes();
    }
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
