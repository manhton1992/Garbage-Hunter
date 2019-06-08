<<<<<<< HEAD
import {Component, Input, OnInit} from '@angular/core';
import {MessageService} from "../../../services/message/message.service";
import {Message} from "../../../models/message.model";
import {Location} from "@angular/common";
=======
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/message/message.service';
import { CommentService } from 'src/app/services/comment/comment.service';
import { Message } from 'src/app/models/message.model';
import { Comment } from 'src/app/models/comment.model';
>>>>>>> develop
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-show-message',
  templateUrl: './show-message.component.html',
  styleUrls: ['./show-message.component.scss']
})
export class ShowMessageComponent implements OnInit {
<<<<<<< HEAD
  @Input() message : Message;
  constructor(
    private messageService : MessageService,
    private location : Location,
    private route : ActivatedRoute
  ) { }
  ngOnInit() {
    this.getMessage();
  }
  getMessage() : void {
    let messageId;
    this.route.paramMap.subscribe(params => {
      messageId = params.get("id");
      this.messageService.getMessageById(params.get("id")).subscribe(message => this.message = message);
    })
  }
  goBack() : void {
    this.location.back();
  }
  upDate() : void {
    this.messageService.updateMessage(this.message).subscribe(() => this.goBack());
  }
  deleteMessage() : void {
    this.messageService.deleteMessage(this.message._id.toString()).pipe().subscribe(() =>this.goBack());
=======

  /**
   * @description the main message.
   * @type {Message}
   * @memberof ShowMessageComponent
   */
  message: Message = null;

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
      this.getComments(messageid);
    });
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
  getComments = (messageid: string):void => {
    this.commentService.getAllComments(messageid).subscribe(comments => {
      this.comments = comments;
    })
>>>>>>> develop
  }
}
