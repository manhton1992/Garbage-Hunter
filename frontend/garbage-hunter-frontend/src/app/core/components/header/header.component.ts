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


  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  logout(){
    this.userService.logout();
  }
}
