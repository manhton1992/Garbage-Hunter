import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user/user.service';
import { CategoryService } from './services/category/category.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private userService: UserService, private categoryService: CategoryService) {}

  title = 'garbage-hunter-frontend';

  /** auto login when open the app */
  ngOnInit(): void {
    if (localStorage.getItem('currentUser')) {
      this.userService.authenticate().subscribe((res) => {
        if (res && res != null) {
          if (res.status === 'success') {
            this.userService.user = res.docs;
          } else {
            alert(res.message);
          }
        }
      });
    }
  }

  /**
   * @description scroll page on top slowly
   */
  onActivate = (event: any): void => {
    const scrollToTop = window.setInterval(() => {
      let pos = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo(0, pos - 50); // how far to scroll on each step
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 16);
  };
}
