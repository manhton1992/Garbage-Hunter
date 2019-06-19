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
  page: number = 1;
  pageSize: number = 6;

  /**
   * @description messages that will be shown.
   * @type {Message[]}
   * @memberof HomeComponent
   */
  messages: Message[] = [];

  /** all user categories we get at begin */
  userCategories: UserCategory[] = [];

  /** followed categories for subcribe */
  followedCategories: Category[] = [];

  /** selected categories for subcribe */
  selectedCategories: Category[] = [];

  constructor(
    private messageService: MessageService,
    private categoryService: CategoryService,
    private userService: UserService,
    private userCategoryService: UserCategoryService
  ) {}

  ngOnInit() {
    this.getMessages();
    if (this.categoryService.categories.length == 0) {
      this.categoryService.getAllCategories().subscribe(
        (response) => {
          this.categoryService.categories = response;
          this.getUserCategoriesAndPutInLayout();
          // console.log('get categories:  ' + JSON.stringify(response));
        },
        (error) => {
          // console.log('get categories unsuccessfully!');
        }
      );
    } else {
      this.getUserCategoriesAndPutInLayout();
    }
  }

  /**
   * @description get all available messages.
   * @memberof HomeComponent
   */
  getMessages = (): void => {
    this.messageService.getAllMessages({ available: true, archive: false }).subscribe((messages) => {
      this.messages = this.sortDateDesc(messages);
    });
  };

  /**
   * delete all alt user categories
   * create user category for subcribe category
   */
  subcribeSubmit = (): void => {
    // delete alt user categories
    if (this.userCategories.length > 0) {
      this.userCategories.forEach((userCategory) => {
        this.userCategoryService.deleteUserCategoryById(userCategory._id).subscribe((response) => {
          // console.log('delete alt usercategory');
        });
      });
    }

    this.userCategories = [];

    // create new user categories
    console.log(this.selectedCategories);
    let isSubcribeSuccess: Boolean = true;
    this.selectedCategories.forEach((category) => {
      let userCategory: UserCategory = {
        userId: this.userService.user._id,
        categoryId: category._id,
      };
      this.userCategoryService.createUserCategory(userCategory).subscribe(
        (response) => {
          this.userCategories.push(response);
        },
        (error) => {
          isSubcribeSuccess = false;
          alert(error.error['data'].message);
        }
      );
    });

    // set the followed categories to the selected categories
    this.followedCategories = this.selectedCategories;

    if (isSubcribeSuccess) {
      alert('SUBSCRIBE SUCCESSFUL!');
    } else {
      alert('ERROR BY SUBSCRIBING! PLEASE TRY AGAIN!');
    }
  };

  /**
   * get user categories
   * put it in this.usercategories
   * and put categories in selected categories
   */
  getUserCategoriesAndPutInLayout = (): void => {
    if (this.userService.user) {
    this.userCategoryService.getAllUserCategories({userId: this.userService.user._id})
    .subscribe(
      (response) => {
      if (response && response.length > 0) {
        this.userCategories = response;
        // console.log('user categories size: ' + this.userCategories.length);

        this.userCategories.forEach((userCategory) => {
          this.categoryService.categories.some((category) => {
            if (category._id == userCategory.categoryId) {
              this.followedCategories.push(category);
              return true;
            }
            return false;
          });
        });
      }
    });
  }
  };

  /**
   * @description sort messages based on the newest date first
   * @memberof HomeComponent
   */
  sortDateDesc = (array: Message[]): Message[] => {
    return array.sort((a,b) => {
      if (new Date(a.created_at) < new Date(b.created_at)) {
        return 1;
      } else if (new Date(a.created_at) > new Date(b.created_at)) {
        return -1;
      } else {
        return 0;
      }
    });
  }
}
