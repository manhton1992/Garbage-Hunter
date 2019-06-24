import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/message/message.service';
import { Message } from 'src/app/models/message.model';
import { CategoryService } from 'src/app/services/category/category.service';
import { Category } from 'src/app/models/category.model';
import { UserService } from 'src/app/services/user/user.service';
import { UserCategory } from 'src/app/models/user-category.model';
import { UserCategoryService } from 'src/app/services/user/user-category/user-category.service';
import { FlashService } from 'src/app/services/flash/flash.service';
import { MessageCategoryService } from 'src/app/services/message/message-category/message-category.service';
import { MessageCategory } from 'src/app/models/message-category.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  page: number = 1;
  pageSize: number = 6;

  /**
 * @description all categories
 * @type {*}
 * @memberof HomeComponent
 */
  allCategories: MessageCategory[] = [];

  /**
 * @description name of a category
 * @type {*}
 * @memberof HomeComponent
 */
  categoryName: string = '';

  /**
 * @description selected filtered category
 * @type {*}
 * @memberof HomeComponent
 */
  selectedCategory: Category;

  /**
   * @description flash message
   * @type {*}
   * @memberof HomeComponent
   */
  flash: any = this.flashService.getFlashes();

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
    public messageService: MessageService,
    public categoryService: CategoryService,
    public userService: UserService,
    public userCategoryService: UserCategoryService,
    public flashService: FlashService,
    public messageCategoryService: MessageCategoryService
  ) { }

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
          this.flashService.setErrorFlash('something went wrong by subscribing, please try again...');
          this.flash = this.flashService.getFlashes();
        }
      );
    });

    // set the followed categories to the selected categories
    this.followedCategories = this.selectedCategories;

    if (isSubcribeSuccess) {
      this.flashService.setFlashSuccess('subscribe successful!');
    } else {
      this.flashService.setErrorFlash('something went wrong by subscribing, please try again...');
    }
    this.flash = this.flashService.getFlashes();
    window.scrollTo(0, 0);
  };

  /**
   * get user categories
   * put it in this.usercategories
   * and put categories in selected categories
   */
  getUserCategoriesAndPutInLayout = (): void => {
    if (this.userService.user) {
      this.userCategoryService.getAllUserCategories({ userId: this.userService.user._id }).subscribe((response) => {
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
    return array.sort((a, b) => {
      if (new Date(a.created_at) < new Date(b.created_at)) {
        return 1;
      } else if (new Date(a.created_at) > new Date(b.created_at)) {
        return -1;
      } else {
        return 0;
      }
    });
  };

  /**
 * get category name from filter
 * get messageId from categoryId
 * display message from category
 */
  getAllMessageCategories = (): void => {
    this.categoryName = this.selectedCategory.name;
    if (this.selectedCategory) {
      this.messageCategoryService.getAllMessageCategories({ categoryId: this.selectedCategory._id }).subscribe((messages) => {
        this.allCategories = messages;
        this.getMessageByCategory();
      })
    }
  }

  /**
   * get messageId from categoryId
   */
  getMessageByCategory = (): void => {
    let message: Message;
    this.messages = [];
    for (let i = 0; i < this.allCategories.length; i++) {
      this.messageService.getMessageById(this.allCategories[i].messageId).subscribe((messages) => {
        message = messages;
        if(!message.archive && message.available){
          this.messages.push(message);
        }
      })
    }
  }

  clearFilter = () : void =>{
    this.getMessages();
  }
}
