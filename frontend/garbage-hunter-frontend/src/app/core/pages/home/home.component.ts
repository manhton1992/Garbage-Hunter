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
  /**
   * @description pagination default 1
   */
  page = 1;

  /**
   * @description items per page
   */
  pageSize = 6;

  /**
   * @description all categories
   */
  allCategories: MessageCategory[] = [];

  /**
   * @description name of a category
   */
  categoryName = '';

  /**
   * @description selected filtered category
   */
  selectedCategory: Category;

  /**
   * @description flash message
   */
  flash: any = this.flashService.getFlashes();

  /**
   * @description messages that will be shown.
   */
  messages: Message[] = [];

  /** all user categories we get at begin */
  userCategories: UserCategory[] = [];

  /** followed categories for subscribe */
  followedCategories: Category[] = [];

  /** selected categories for subscribe */
  selectedCategories: Category[] = [];

  constructor(
    public messageService: MessageService,
    public categoryService: CategoryService,
    public userService: UserService,
    public userCategoryService: UserCategoryService,
    public flashService: FlashService,
    public messageCategoryService: MessageCategoryService
  ) {}

  ngOnInit() {
    this.getMessages();
    if (this.categoryService.categories.length === 0) {
      this.categoryService.getAllCategories().subscribe(
        (response) => {
          this.categoryService.categories = response;
          this.getUserCategoriesAndPutInLayout();
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
   */
  getMessages = (): void => {
    this.messageService.getAllMessages({ available: true, archive: false }).subscribe((messages) => {
      this.messages = this.sortDateDesc(messages);
    });
  }

  /**
   * delete all alt user categories
   * create user category for subscribe category
   */
  subscribeSubmit = (): void => {
    // delete alt user categories
    if (this.userCategories.length > 0) {
      this.userCategories.forEach((userCategory) => {
        this.userCategoryService.deleteUserCategoryById(userCategory._id).subscribe();
      });
    }

    this.userCategories = [];

    // create new user categories
    let isSubscribeSuccess = true;
    this.selectedCategories.forEach((category) => {
      const userCategory: UserCategory = {
        userId: this.userService.user._id,
        categoryId: category._id,
      };
      this.userCategoryService.createUserCategory(userCategory).subscribe(
        (response) => {
          this.userCategories.push(response);
        },
        (error) => {
          isSubscribeSuccess = false;
          this.flashService.setErrorFlash('something went wrong by subscribing, please try again...');
          this.flash = this.flashService.getFlashes();
        }
      );
    });

    // set the followed categories to the selected categories
    this.followedCategories = this.selectedCategories;

    if (isSubscribeSuccess) {
      this.flashService.setFlashSuccess('subscribe successful!');
    } else {
      this.flashService.setErrorFlash('something went wrong by subscribing, please try again...');
    }
    this.flash = this.flashService.getFlashes();
    window.scrollTo(0, 0);
  }

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
          this.userCategories.forEach((userCategory) => {
            this.categoryService.categories.some((category) => {
              if (category._id === userCategory.categoryId) {
                this.followedCategories.push(category);
                return true;
              }
              return false;
            });
          });
        }
      });
    }
  }

  /**
   * @description sort messages based on the newest date first
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
  }

  /**
   * get category name from filter
   * get messageId from categoryId
   * display message from category
   */
  getAllMessageCategories = (): void => {
    this.categoryName = this.selectedCategory.name;
    if (this.selectedCategory) {
      this.messageCategoryService
        .getAllMessageCategories({ categoryId: this.selectedCategory._id })
        .subscribe((messages) => {
          this.allCategories = messages;
          this.getMessageByCategory();
        });
    }
  }

  /**
   * get messageId from categoryId
   */
  getMessageByCategory = (): void => {
    let message: Message;
    this.messages = [];
    for (const category of this.allCategories) {
      this.messageService.getMessageById(category.messageId).subscribe((messages) => {
        message = messages;
        if (!message.archive && message.available) {
          this.messages.push(message);
        }
      });
    }
  }

  clearFilter = (): void => {
    this.getMessages();
  }
}
