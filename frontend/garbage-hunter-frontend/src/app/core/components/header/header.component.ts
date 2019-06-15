import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  /** toggle navbar collapse.
   * @description
   * @memberof HeaderComponent
   */
  isCollapsed = true;

  currentUser : User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    if (localStorage.getItem("currentUser")){
      this.userService.authenticate()
      .subscribe(res => {
        if (res && res != null){
          if (res.status == 'success'){
            this.userService.user =  res.docs;
            this.currentUser = this.userService.user;
            console.log("User is : " + this.currentUser)
          } else {
            alert (res.message);
          }
        }
      });
      }
  }

  logout(){
    this.userService.logout();
    this.currentUser = null;
  }
}
