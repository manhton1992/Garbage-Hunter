import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  /**
   * @description toggle navbar collapse
   */
  isCollapsed = true;


  constructor(public userService: UserService) { }

  ngOnInit() {
  }

  logout() {
    this.userService.logout();
  }
}
