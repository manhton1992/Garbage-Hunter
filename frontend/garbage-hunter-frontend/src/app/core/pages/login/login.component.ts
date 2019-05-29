import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { Observable, Subscription } from 'rxjs';

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
  constructor(private userService : UserService) { }

   
  ngOnInit() {
  }

  submitLogin(){
    let response: any ;
    this.userService.getUser(this.userLogin.email,this.userLogin.password).subscribe(res => {
      response = res;
      console.log(res);
      if (response != null){
        if(response.status != null && response.status == 'success'){
          this.userService.user = response.docs; 
          console.log("login success");
          
        } else if (response.status != null && response.status == 'fail'){
          console.log("false input or user does not exist");
        } else {
          console.log("error when einlogging")
        }
  
      }
    });
 
  }

}
