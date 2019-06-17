import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  userRegister = {
    email: '',
    password: '',
  };
  passwordType: string = 'password';
  passwordShow: boolean = false;

  passwordConfirm: String = '';
  constructor(private userService: UserService, private router: Router) {}

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
          this.router.navigate(['/login']);
          alert('REGISTER SUCCESS! PLEASE CONFIRM EMAIL TO USE THIS ACCOUNT!');
        },
        (error) => {
          alert(error.error['data'].message);
        }
      );
    } else {
      alert('password and password confirm not the same');
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
