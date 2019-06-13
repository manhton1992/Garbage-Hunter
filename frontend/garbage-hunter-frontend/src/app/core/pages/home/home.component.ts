import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/message/message.service';
import { Message } from 'src/app/models/message.model';
import { CategoryService } from 'src/app/services/category/category.service';
import { Category } from 'src/app/models/category.model';
import { UserService } from 'src/app/services/user/user.service';
import { UserCategory } from 'src/app/models/user-category.model';
import { UserCategoryService } from 'src/app/services/user/user-category/user-category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  /**
   * @description messages that will be shown.
   * @type {Message[]}
   * @memberof HomeComponent
   */
  messages: Message[] = [];
  selectedCategories: Category[] = [];

  constructor(private messageService: MessageService,
    private categoryService: CategoryService,
    private userService: UserService,
    private userCategoryService: UserCategoryService) {}

  ngOnInit() {
    this.getMessages();
    if (this.categoryService.categories.length == 0){
      
      this.categoryService.getAllCategories()
      .subscribe(response => {
          this.categoryService.categories = response;
          console.log("get categories:  " + JSON.stringify(response));
      }, error => {
        console.log("get categories unsuccessfully!");
      })
    } 

  }

  /**
   * @description get all available messages.
   * @memberof HomeComponent
   */
  getMessages = (): void => {
     this.messageService.getAllMessages({"available":true}).subscribe((messages) => {
       this.messages = messages;
     });
  };

  /**
   * create user category for subcribe category
   */
  subcribeSubmit = (): void => {
    console.log(this.selectedCategories);
    let isSubcribeSuccess: Boolean = true;
    this.selectedCategories.forEach((category) => {
      let userCategory : UserCategory = {
        userId: this.userService.user._id,
        categoryId: category._id
      }
      this.userCategoryService.createUserCategory(userCategory)
      .subscribe(response => {},
        error => {
          isSubcribeSuccess = false;
          alert (error.error['data'].message);
        }
      );
    })

    if (isSubcribeSuccess){
      alert ("subcribe successfully");
    } else {
      alert ("subcribe unsuccessfully. Please try again");
    }
  }
}
