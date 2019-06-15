import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/message/message.service';
import { CommentService } from 'src/app/services/comment/comment.service';
import { Message } from 'src/app/models/message.model';
import { Comment } from 'src/app/models/comment.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
/**
   * @description current user that accessing the page.
   * @type {User}
   * @memberof ShowMessageComponent
   */
  currentUser: User = null;

  /**
   * @description the main message.
   * @type {Message}
   * @memberof ShowMessageComponent
   */
  message: Message = null;

  /**
   * @description all categories of the main message.
   * @type {Category[]}
   * @memberof ShowMessageComponent
   */
  messageCategories: Category[] = [];

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
    private commentService: CommentService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.currentUser = this.userService.user;
    this.route.params.subscribe(params => {
      let messageid = params['messageid'];
      this.getMessage(messageid);
      this.getCreator();
      this.getComments();
    });
    this.messageCategories = this.dummyCategories;  // test dummy
    this.creator = this.dummyCreator;  // test dummy
  }

  /**
   * @description get the message item.
   * @param {string} messageid
   */
  getMessage = (messageid: string):void => {
    this.messageService.getMessageById(messageid).subscribe(message => {
      this.message = message;
    }, error => {
      this.showError = true;
    })
  }

  /**
   * @description get the creator of the message
   * @memberof ShowMessageComponent
   */
  getCreator = (): void => {
    if (this.message) {
      
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
   * @description delete the message.
   * @memberof ShowMessageComponent
   */
  archiveMessage = (): void => {
    if (this.currentUser && this.currentUser.isAdmin) { 
      this.message.archive = true;
      this.messageService.updateMessage(this.message).subscribe(success => {
        this.router.navigate(['/']);
      });
    }
  }

  /**
   * @description show action div that contains buttons to do something to the message
   * @memberof ShowMessageComponent
   */
  showActionDiv = (): boolean => {
    if (!this.currentUser) {
      // return false;
    }
    return true;
  }

  /**
   * @description show/hide edit and mark as unavailable buttons specific to current user.
   * @memberof ShowMessageComponent
   */
  showEditChangeButton = (): boolean => {
    if (this.currentUser && (this.currentUser._id == this.creator._id || this.currentUser.isAdmin)) {
      return true;
    }
    return false;
  }

  /**
   * @description show/hide delete button only to admins.
   * @returns {boolean}
   */
  showDeleteButton = (): boolean => {
    if (this.currentUser && this.currentUser.isAdmin) {
      return true;
    }
    return false;
  }

  editMessage(message: Message){
    let url = '/messages/' + message._id;
    this.messageService.updateMessage(message).subscribe();
    alert("Message successfully edited");
    this.router.navigate[url];
  }

  // DUMMY CATEGORIES
  dummyCategories: Category[] = [
    {
      _id: 'cat1',
      name: 'chair'
    },
    {
      _id: 'cat2',
      name: 'furniture'
    }
  ]

  dummyCreator: User = {
    _id: 'user1',
    email: 'bagusnanda@test.com',
    firstName: 'Bagus',
    lastName: 'Nanda',
    phoneNumber: '015628374',
    passwordHash: 'string',
    isAdmin: true,
    isConfirm: true,
    profileImageUrl: 'string',
    created_at: new Date('2019-02-12'),
  }
}

