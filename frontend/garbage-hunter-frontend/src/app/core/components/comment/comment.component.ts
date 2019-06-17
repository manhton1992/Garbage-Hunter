import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { MessageService } from 'src/app/services/message/message.service';
import { CommentService } from 'src/app/services/comment/comment.service';
import { ActivatedRoute } from '@angular/router';
import { Comment } from 'src/app/models/comment.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {

  comments: Comment[] = [];
  thisMessageID = '';

  newComment: Comment = {
    text: '',
    creatorId: this.userService.user && this.userService.user._id ? this.userService.user._id : null,
    parentId: '',
    messageId: '',
    imageUrl: '',
    archive: false,
  };

  constructor(
    private userService: UserService,
    private commentService: CommentService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getMessageId();
    this.getComments();
    this.route.params.subscribe((params) => {
      this.newComment.messageId = params['messageid'];
    });
  }

  getComments(): void {
    this.commentService.getCommentByMessageId(this.thisMessageID).subscribe((comments) => {
      comments.forEach( comment => {
        this.userService.getUserById(comment.creatorId).subscribe(user => {
          comment.creatorId = user.email;
        })
      })
      this.comments = comments;
    });
  }
  getMessageId(): void {
    this.route.params.subscribe((params) => {
      this.thisMessageID = params['messageid'];
    });
  }

  addNewComment(e: any) {
    let thisNewComment = Object.assign({}, this.newComment);
    if (this.userService.user) {
      this.commentService.createComment(thisNewComment).subscribe(
        (reponseCommnet) => {
          this.comments.push(this.newComment);
          // alert('COMMENT CREATED! RELOADING PAGE!');
        },
        (error) => {
          alert(error.error['data'].message);
        }
      );
    } else {
      alert('PLEASE LOGIN TO CREATE COMMENT');
    }
    e.target.value = '';
  }
}
