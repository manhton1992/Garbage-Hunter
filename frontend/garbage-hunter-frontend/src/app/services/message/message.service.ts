import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/internal/operators';
import { Message } from 'src/app/models/message.model';
import { observableHandleError } from 'src/app/middlewares/errorhandler.middleware';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  
  /**
   * @description url for the message API.
   * @private
   * @memberof MessageService
   */
  private messageUrl = `${environment.baseUrl}/messages`;

  constructor(private http: HttpClient) {}

  private getHeader = (): any => {
    const data = JSON.parse(localStorage.getItem('currentUser'));
    const token = data ? data.token : null;
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }

  /**
   * @description get all messages.
   * @returns {Observable<Message>[]}
   * @memberof MessageService
   */
  getAllMessages = (query: any): Observable<Message[]> => {
    return this.http.get<Message[]>(this.messageUrl, { params: query }).pipe(
      map((response) => response['data']['docs']),
      catchError((err) => observableHandleError(err))
    );
  };

  /**
   * @description get message by id.
   * @returns {Observable<Message>}
   * @memberof MessageService
   */
  getMessageById = (messageid: string): Observable<Message> => {
    const url = `${this.messageUrl}/${messageid}`;
    return this.http.get<Message>(url).pipe(
      map((response) => response['data']['docs']),
      catchError((err) => observableHandleError(err))
    );
  };

  /**
   * @description create new message.
   * @returns {Observable<Message>}
   * @memberof MessageService
   */
  createMessage = (message: Message): Observable<Message> => {
    return this.http.post<Message>(this.messageUrl, message, {headers: this.getHeader()}).pipe(
      map((response) => response['data']['docs']),
      catchError((err) => observableHandleError(err))
    );
  };

  /**
   * @description update message by id.
   * @returns {Observable<Message>}
   * @memberof MessageService
   */
  updateMessage(message: Message): Observable<Message> {
    const url = `${this.messageUrl}/${message._id}`;
    return this.http.put<Message>(url, message, {headers: this.getHeader()}).pipe(catchError((err) => observableHandleError(err)));
  }

  /**
   * @description delete message by id.
   * @returns {Observable<{}>}
   * @memberof MessageService
   */
  deleteMessage(messageid: string): Observable<{}> {
    const url = `${this.messageUrl}/${messageid}`;
    return this.http.delete<{}>(url, {headers: this.getHeader()}).pipe(catchError((err) => observableHandleError(err)));
  }

  /**
   * @description download all messages
   * @memberof MessageService
   */
  downloadMessages(): void {
    window.open(this.messageUrl + '/download', '_self');
  }

  /**
   * @description upload image to AWS S3
   * @param {File} image
   * @returns {Observable<string>}
   * @memberof MessageService
   */
  uploadImage(image: File): Observable<string> {
    const url = `${this.messageUrl}/image_upload`;
    const formData = new FormData();
    formData.append('image', image);
    return this.http.post<string>(url, formData).pipe(
      map((response) => response['data']['docs']['imageUrl']),
      catchError((err) => observableHandleError(err))
    );
  }

  /**
   * @description upload image to AWS S3
   * @param {File} image
   * @returns {Observable<string>}
   * @memberof MessageService
   */
  deleteUploadedImage(imageKey: string): Observable<{}> {
    const url = `${this.messageUrl}/delete_image`;
    return this.http.post<string>(url, {key: imageKey}, {headers: this.getHeader()}).pipe(
      map((response) => response['data']),
      catchError((err) => observableHandleError(err))
    );
  }
}
