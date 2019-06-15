import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user/user.service';
import { CategoryService } from './services/category/category.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  constructor(private userService: UserService,
    private categoryService: CategoryService) { }

  /** auto login when open the app */
  ngOnInit(): void {
    if (localStorage.getItem("currentUser")) {
      this.userService.authenticate()
        .subscribe(res => {
          if (res && res != null) {
            if (res.status == 'success') {
              this.userService.user = res.docs;
              console.log("auto login successfully");
            } else {
              alert(res.message);
            }
          }
        });
    }

  }
  title = 'garbage-hunter-frontend';
}
