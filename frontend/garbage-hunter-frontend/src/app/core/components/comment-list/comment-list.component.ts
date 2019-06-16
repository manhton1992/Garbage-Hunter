import { Component, OnInit } from '@angular/core';
import {CommentService} from "../../../services/comment/comment.service";
import {Comment} from "../../../models/comment.model";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../../services/user/user.service";

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit {
  comments : Comment[] = [];
  thisMessageID = '';
  constructor( private commentService : CommentService, private route : ActivatedRoute, private userService : UserService) { }

  ngOnInit() {
    this.getMessageId();
    this.getComments();
  }

  getComments() : void {
    this.commentService.getCommentByMessageId(this.thisMessageID).subscribe(comments => this.comments = comments);
  }
  getMessageId() : void {
    this.route.params.subscribe(params => {
      this.thisMessageID = params['messageid'];
    });
  }

}
