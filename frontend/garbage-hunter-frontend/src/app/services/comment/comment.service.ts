import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Comment } from 'src/app/models/comment.model';
import { map, catchError } from 'rxjs/internal/operators';
import { observableHandleError } from 'src/app/middlewares/errorhandler.middleware';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  /**
   * @description url of the comment will be processed in each function.
   * EACH FUNCTION NEEDS TO PASSED THE MESSAGE ID
   * @private
   * @memberof CommentService
   */
  private messageUrl = 'http://localhost:3000/api/messages';

  constructor(private http: HttpClient, ) {}

  /**
   * @description get all comments in a message.
   * @returns {Observable<Comment>[]}
   * @memberof CommentService
   */
  getAllComments = (messageid: string): Observable<Comment[]> => {
    const url = `${this.messageUrl}/${messageid}/comments`;
    return this.http.get<Comment[]>(url).pipe(
      map((response) => response['data']['docs']),
      catchError((err) => observableHandleError(err))
    );
  };

  /**
   * @description get comment by id.
   * @returns {Observable<Message>}
   * @memberof CommentService
   */
  getCommentById = (messageid: string, commentid: string): Observable<Comment> => {
    const url = `${this.messageUrl}/${messageid}/comments/${commentid}`;
    return this.http.get<Comment>(url).pipe(
      map((response) => response['data']['docs']),
      catchError((err) => observableHandleError(err))
    );
  };

  /**
   * @description create new comment.
   * @returns {Observable<Comment>}
   * @memberof CommentService
   */
  createComment = (messageid: string, comment: Comment): Observable<Comment> => {
    const url = `${this.messageUrl}/${messageid}/comments`;
    return this.http.post<Comment>(url, comment).pipe(
      map((response) => response['data']['docs']),
      catchError((err) => observableHandleError(err))
    );
  };

  /**
   * @description update comment by id.
   * @returns {Observable<Comment>}
   * @memberof CommentService
   */
  updateCommentById(messageid: string, comment: Comment): Observable<Comment> {
    const url = `${this.messageUrl}/${messageid}/comments/${comment._id}`;
    return this.http.put<Comment>(url, comment).pipe(catchError((err) => observableHandleError(err)));
  }

  /**
   * @description delete comment by id.
   * @returns {Observable<{}>}
   * @memberof CommentService
   */
  deleteCommentById(messageid: string, commentid: string): Observable<{}> {
    const url = `${this.messageUrl}/${messageid}/comments/${commentid}`;
    return this.http.delete<{}>(url).pipe(catchError((err) => observableHandleError(err)));
  }
}
