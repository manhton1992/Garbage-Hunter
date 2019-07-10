import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/message/message.service';
import { CommentService } from 'src/app/services/comment/comment.service';
import { Message } from 'src/app/models/message.model';
import { Comment } from 'src/app/models/comment.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user/user.service';
import { MessageCategoryService } from 'src/app/services/message/message-category/message-category.service';
import { MessageCategory } from 'src/app/models/message-category.model';
import { CategoryService } from 'src/app/services/category/category.service';
import { FlashService } from 'src/app/services/flash/flash.service';

@Component({
  selector: 'app-show-message',
  templateUrl: './show-message.component.html',
  styleUrls: ['./show-message.component.scss'],
})
export class ShowMessageComponent implements OnInit {
  /**
   * @description flash message
   */
  flash: any = this.flashService.getFlashes();

  /**
   * @description the main message.
   */
  message: Message = null;

  /**
   * @description all categories of the main message.
   */
  messageCategories: MessageCategory[] = [];

  /**
   * @description all categories in the main message.
   */
  category: Category[] = [];

  /**
   * @description creator of the main message
   */
  creator: User = null;

  /**
   * @description all comments of the main message.
   */
  comments: Comment[] = [];

  /**
   * @description if true, show error component
   */
  showError = false;

  constructor(
    public messageService: MessageService,
    public messageCategoryService: MessageCategoryService,
    public categoryService: CategoryService,
    public commentService: CommentService,
    public userService: UserService,
    public route: ActivatedRoute,
    public router: Router,
    public flashService: FlashService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(async (params) => {
      const messageid = params['messageid'];
      this.getMessage(messageid);
    });
  }

  /**
   * @description get the message item.
   */
  getMessage = (messageid: string): void => {
    this.messageService.getMessageById(messageid).subscribe(
      (message) => {
        this.message = message;
        if (this.message) {
          this.getCreator();
          this.getComments();
          this.getMessageCategories();
        }
      },
      (error) => {
        this.showError = true;
      }
    );
  }

  /**
   * @description get the creator of the message
   */
  getCreator = (): void => {
    if (this.message) {
      this.userService.getUserById(this.message.creatorId).subscribe((user) => {
        this.creator = user;
      });
    }
  }
  /**
   * @description get all comments of the message.
   */
  getComments = (): void => {
    if (this.message) {
      this.commentService.getAllComments({ messageId: this.message._id }).subscribe((comments) => {
        this.comments = comments;
      });
    }
  }

  /**
   * @description get all available messages.
   */
  getMessageCategories = (): void => {
    this.messageCategoryService.getAllMessageCategories({ messageId: this.message._id }).subscribe((messages) => {
      this.messageCategories = messages;
      if (this.messageCategories) {
        this.getCategoryNames();
      }
    });
  }

  getCategoryNames = (): void => {
    for (const messageCategory of this.messageCategories) {
      this.categoryService.getCategoryById(messageCategory.categoryId).subscribe((messages) => {
        this.category.push(messages);
      });
    }
  }

  /**
   * @description set as unavailable.
   */
  setAsUnavailable = (): void => {
    this.message.available = false;
    this.messageService.updateMessage(this.message).subscribe((success) => {
      this.flashService.setFlashSuccess('Message is marked as unavailable!');
      this.router.navigate(['/']);
    });
  }

  /**
   * @description delete the message.
   */
  archiveMessage = (): void => {
    this.message.archive = true;
    this.message.available = false;
    this.messageService.updateMessage(this.message).subscribe((success) => {
      this.flashService.setFlashSuccess('MESSAGE IS ARCHIVED!');
      this.router.navigate(['/']);
    });
  }

  /**
   * @description show/hide edit and mark as unavailable buttons specific to current user.
   */
  showEditChangeButton = (): boolean => {
    if (this.userService.user && (this.userService.user.isAdmin || this.userService.user._id === this.creator._id)) {
      return true;
    }
    return false;
  }

  /**
   * @description show/hide delete button only to admins.
   */
  showDeleteButton = (): boolean => {
    if (this.userService.user && this.userService.user.isAdmin) {
      return true;
    }
    return false;
  }
}
