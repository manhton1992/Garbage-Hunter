import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user/user.service";
import {CommentService} from "../../../services/comment/comment.service";
import {Comment} from "../../../models/comment.model";
import {MessageService} from "../../../services/message/message.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.scss']
})
export class CreateCommentComponent implements OnInit {

  constructor(private userService: UserService, private messageService : MessageService,
              private commentService: CommentService, private route: ActivatedRoute) { }

  newComment : Comment = {
    text: '',
    creatorId: (this.userService.user && this.userService.user._id) ? this.userService.user._id : null,
    parentId: '',
    messageId: '',
    imageUrl: '',
    archive: false
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.newComment.messageId = params['messageid'];
    });
  }

  addNewComment(){
    let thisNewComment = Object.assign({}, this.newComment);
    if (this.userService.user) {
      this.commentService.createComment(thisNewComment).subscribe( reponseCommnet => {
        setTimeout(() => {
         console.log("Request time out new Comment!");
        },2000);
        alert("create message successfully");
      }, error => {
        alert (error.error['data'].message);
      });
    } else {
      alert ("please login to create new message");
    }
  }
}
