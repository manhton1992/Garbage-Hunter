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

  page: number = 1;
  pageSize: number = 4;

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
    public userService: UserService,
    public commentService: CommentService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getMessageId();
    this.getComments();
  }

  getComments(): void {
    this.commentService.getCommentByMessageId(this.thisMessageID).subscribe((comments) => {
      comments.forEach( comment => {
        this.userService.getUserById(comment.creatorId).subscribe(user => {
          comment.creatorId = user.email;
        })
      })
      this.comments = this.sortDateDesc(comments);
    });
  }
  getMessageId(): void {
    this.route.params.subscribe((params) => {
      this.thisMessageID = params['messageid'];
      this.newComment.messageId = params['messageid'];
    });
  }

  addNewComment(e: any) {
    let thisNewComment = Object.assign({}, this.newComment);
    if (this.userService.user) {
      this.commentService.createComment(thisNewComment).subscribe(
        (reponseCommnet) => {
          thisNewComment.creatorId = this.userService.user.email;
          this.comments.unshift(thisNewComment);
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

  /**
   * @description sort comments based on the newest date first
   * @memberof CommentComponent
   */
  sortDateDesc = (array: Comment[]): Comment[] => {
    return array.sort((a,b) => {
      if (new Date(a.created_at) < new Date(b.created_at)) {
        return 1;
      } else if (new Date(a.created_at) > new Date(b.created_at)) {
        return -1;
      } else {
        return 0;
      }
    });
  }
}
