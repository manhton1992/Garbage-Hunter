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

@Component({
  selector: 'app-show-message',
  templateUrl: './show-message.component.html',
  styleUrls: ['./show-message.component.scss']
})
export class ShowMessageComponent implements OnInit {
  /**
   * @description the main message.
   * @type {Message}
   * @memberof ShowMessageComponent
   */
  message: Message = null;

  /**
   * @description all categories of the main message.
   * @type {MessageCategory[]}
   * @memberof ShowMessageComponent
   */
  messageCategories: MessageCategory[] = [];

/**
   * @description all categories in the main message.
   * @type {Category[]}
   * @memberof ShowMessageComponent
   */
  category: Category[] = [];

  /**
   * @description creator of the main message
   * @type {User}
   * @memberof ShowMessageComponent
   */
  creator: User = null;

  /**
   * @description all comments of the main message.
   * @type {Comment[]}
   * @memberof ShowMessageComponent
   */
  comments: Comment[] = [];

  showError: boolean = false;

  constructor(
    private messageService: MessageService,
    private messageCategoryService: MessageCategoryService,
    private categoryService: CategoryService,
    private commentService: CommentService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

   ngOnInit() {
    this.route.params.subscribe( async (params) =>  {
      let messageid = params['messageid'];
      this.getMessage(messageid);
    });
  }

  /**
   * @description get the message item.
   * @param {string} messageid
   */
  getMessage = (messageid: string):void => {
    this.messageService.getMessageById(messageid).subscribe(message => {
      this.message = message;
      if(this.message ) {
        this.getCreator();
        this.getComments();
        this.getMessageCategories();
      }
    }
    , error => {
      this.showError = true;
    })
  }

  /**
   * @description get the creator of the message
   * @memberof ShowMessageComponent
   */
  getCreator = (): void => {
    if (this.message) {
      this.userService.getUserById(this.message.creatorId).subscribe(user => {
        this.creator = user; 
      })
    }
  }
  /**
   * @description get all comments of the message.
   * @param {string} messageid
   */
  getComments = ():void => {
    if (this.message) { 
      this.commentService.getAllComments({ messageId: this.message._id }).subscribe(comments => {
        this.comments = comments;
      });
    }
  }

  /**
   * @description get all available messages.
   * @memberof HomeComponent
   */
  getMessageCategories = (): void => {
    this.messageCategoryService.getAllMessageCategories({messageId: this.message._id}).subscribe((messages) => {
      this.messageCategories = messages;
      if(this.messageCategories){
        this.getCategoryNames();
      }
    });
 };

 getCategoryNames = (): void => {
   for (let i = 0; i < this.messageCategories.length; i++){
     this.categoryService.getCategoryById(this.messageCategories[i].categoryId).subscribe((messages) =>{
       this.category.push(messages);
      })
    }
 }

 /**
  * @description set as unavailable.
  * @memberof ShowMessageComponent
  */
 setAsUnavailable = (): void => {
   this.message.available = false;
   this.messageService.updateMessage(this.message).subscribe(success => {
     alert('MESSAGE IS MARKED AS UNAVAILABLE!');
    this.router.navigate(['/']);
  });
 }

  /**
   * @description delete the message.
   * @memberof ShowMessageComponent
   */
  archiveMessage = (): void => { 
      this.message.archive = true;
      this.message.available = false;
      this.messageService.updateMessage(this.message).subscribe(success => {
        alert('MESSAGE IS ARCHIVED!');
        this.router.navigate(['/']);
      });
  }

  /**
   * @description show/hide edit and mark as unavailable buttons specific to current user.
   * @memberof ShowMessageComponent
   */
  showEditChangeButton = (): boolean => {
    if (this.userService.user && (this.userService.user.isAdmin || this.userService.user._id == this.creator._id)) {
      return true;
    }
    return false;
  }

  /**
   * @description show/hide delete button only to admins.
   * @returns {boolean}
   */
  showDeleteButton = (): boolean => {
    if (this.userService.user && this.userService.user.isAdmin) {
      return true;
    }
    return false;
  }
}
