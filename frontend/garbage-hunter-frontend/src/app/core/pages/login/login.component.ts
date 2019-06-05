import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { Observable, Subscription } from 'rxjs';
import {el} from "@angular/platform-browser/testing/src/browser_util";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private userLogin = {
    email : "",
    password : "",
  };
  passwordType: string = 'password';
  passwordShow: boolean = false;
  constructor(private userService : UserService) { }

   
  ngOnInit() {
  }

  submitLogin(){
    let response: any ;
    this.userService.login(this.userLogin.email,this.userLogin.password).subscribe(response => {
      console.log(response);
      if (response && response.token){
        if(response.status != null && response.status == 'success'){
          //this.userService.user = response.docs; 
          let user = {
            docs: response.docs,
            token: response.token,
          }
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));

          console.log("login success");
          
        } else if (response.status != null && response.status == 'fail'){
          console.log("false input or user does not exist");
        } else {
          console.log("error when einlogging")
        }
  
      }
    });
 
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
