import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  userRegister = {
    email: "",
    password: ""
  }
  passwordType: string = 'password';
  passwordShow: boolean = false;

  passwordConfirm: String = "";
  constructor(private userService: UserService) {}

  ngOnInit() {
  }

  submitRegister(){
    if (this.userRegister.email != "" && this.userRegister.password != ""
    && this.passwordConfirm.trim() == this.userRegister.password.trim()){
      this.userService.register(this.userRegister)
      .subscribe(res => {
        console.log(res);
        alert ("register success. Please confirm email to use this account");
      }, error => {
        alert (error.error['data'].message);
      }
      )} else {
      alert("password and password confirm not the same");
    }
  }
  public togglePassword(){
    if (this.passwordShow){
      this.passwordShow = false;
      this.passwordType = 'password';
    }else {
      this.passwordShow = true;
      this.passwordType = 'text';
    }
  }

}
