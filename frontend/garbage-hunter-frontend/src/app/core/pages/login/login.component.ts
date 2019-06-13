import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userLogin = {
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
    this.userService.login(this.userLogin.email,this.userLogin.password)
    .subscribe(response => {
          //this.userService.user = response.docs; 
          let user = {
            token: response.token,
          }
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.removeItem('currentUser');
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.userService.user = response.docs;
          console.log( this.userService.user)

          console.log("login successfully");
          alert ("login successfully");
          
    }, error => {
      alert (error.error['data'].message);
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
