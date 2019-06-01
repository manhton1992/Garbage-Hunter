import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/internal/operators';
import { Message } from 'src/app/models/message.model';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private messageUrl = 'http://localhost:3000/api/messages';

  constructor(private http: HttpClient) {}

  /**
   * @description get all messages.
   * @returns {Observable<Message>[]}
   * @memberof MessageService
   */
  getAllMessages = (): Observable<Message[]> => {
    return this.http
      .get<Message[]>(this.messageUrl)
      .pipe(map((response) => response['data']['docs']));
  }

  /**
   * @description get message by id.
   * @returns {Observable<Message>}
   * @memberof MessageService
   */
  getMessageById = (messageid: string): Observable<Message> => {
    const url = `${this.messageUrl}/${messageid}`;
    return this.http
      .get<Message>(url)
      .pipe(map((response) => response['data']['docs']));
  }

  /**
   * @description create new message.
   * @returns {Observable<Message>}
   * @memberof MessageService
   */
  createMessage = (message: Message): Observable<Message> => {
    return this.http
      .post<Message>(this.messageUrl, message)
      .pipe(map((response) => response['data']['docs']));
  }

  /**
   * @description update message by id.
   * @returns {Observable<Message>}
   * @memberof MessageService
   */
  updateMessage(message: Message): Observable<Message> {
    const url = `${this.messageUrl}/${message._id}`;
    return this.http
      .put<Message>(url, message)
      .pipe(catchError(err => this.handleError(err)));
  }

  /**
   * @description delet message by id.
   * @returns {Observable<{}>}
   * @memberof MessageService
   */
  deleteMessage(messageid: string): Observable<{}> {
    const url = `${this.messageUrl}/${messageid}`;
    return this.http
      .delete<{}>(url)
      .pipe(catchError(err => this.handleError(err)));
  }

  /**
   * @description error handling for update and delete message.
   * @private
   * @param {HttpErrorResponse} error
   * @returns
   * @memberof MessageService
   */
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
}
