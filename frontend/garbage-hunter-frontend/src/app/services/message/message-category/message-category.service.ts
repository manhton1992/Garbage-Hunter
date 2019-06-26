import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/internal/operators';
import { observableHandleError } from 'src/app/middlewares/errorhandler.middleware';
import { MessageCategory } from 'src/app/models/message-category.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MessageCategoryService {
  private messageCategoryUrl = `${environment.baseUrl}/message_category`;

  constructor(private http: HttpClient) {}

  private getHeader = (): any => {
    const data = JSON.parse(localStorage.getItem('currentUser'));
    const token = data ? data.token : null;
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
  }

  /**
   * @description get all MessageCategory in a message.
   */
  getAllMessageCategories = (query: any): Observable<MessageCategory[]> => {
    return this.http.get<MessageCategory[]>(this.messageCategoryUrl, { params: query }).pipe(
      map((response) => response['data']['docs']),
      catchError((err) => observableHandleError(err))
    );
  }

  /**
   * @description get MessageCategory by id.
   */
  getMessageCategoryById = (messagecategoryid: string): Observable<MessageCategory> => {
    const url = `${this.messageCategoryUrl}/${messagecategoryid}`;
    return this.http.get<MessageCategory>(url).pipe(
      map((response) => response['data']['docs']),
      catchError((err) => observableHandleError(err))
    );
  }

  /**
   * @description create new MessageCategory.
   */
  createMessageCategory = (messageCategory: MessageCategory): Observable<MessageCategory> => {
    return this.http
      .post<MessageCategory>(this.messageCategoryUrl, messageCategory, { headers: this.getHeader() })
      .pipe(
        map((response) => response['data']['docs']),
        catchError((err) => observableHandleError(err))
      );
  }

  /**
   * @description update MessageCategory by id.
   */
  updateMessageCategoryById(messageCategory: MessageCategory): Observable<MessageCategory> {
    const url = `${this.messageCategoryUrl}/${messageCategory._id}`;
    return this.http
      .put<MessageCategory>(url, messageCategory, { headers: this.getHeader() })
      .pipe(catchError((err) => observableHandleError(err)));
  }

  /**
   * @description delete MessageCategory by id.
   */
  deleteMessageCategoryById(messagecategoryid: string): Observable<{}> {
    const url = `${this.messageCategoryUrl}/${messagecategoryid}`;
    return this.http
      .delete<{}>(url, { headers: this.getHeader() })
      .pipe(catchError((err) => observableHandleError(err)));
  }
}
