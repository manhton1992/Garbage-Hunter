import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

}
