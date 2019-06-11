import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/message/message.service';
import { CommentService } from 'src/app/services/comment/comment.service';
import { Message } from 'src/app/models/message.model';
import { Comment } from 'src/app/models/comment.model';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { User } from 'src/app/models/user.model';

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
   * @type {Category[]}
   * @memberof ShowMessageComponent
   */
  messageCategories: Category[] = [];

  creator: User = null;

  /**
   * @description all comments of the main message.
   * @type {Comment[]}
   * @memberof ShowMessageComponent
   */
  comments: Comment[] = [];

  constructor(
    private messageService: MessageService,
    private commentService: CommentService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let messageid = params['messageid'];
      this.getMessage(messageid);
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
    })
  }

  /**
   * @description get all comments of the message.
   * @param {string} messageid
   */
  getComments = ():void => {
    this.commentService.getAllComments({ messageId: this.message._id }).subscribe(comments => {
      this.comments = comments;
    })
  }

  /**
   * @description show action div that contains buttons to do something to the message
   * @memberof ShowMessageComponent
   */
  showActionDiv = (): boolean => {
    // TODO should return false if it is a normal user (can only see)
    return true;
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
