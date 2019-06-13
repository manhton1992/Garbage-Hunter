import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/internal/operators';
import { observableHandleError } from 'src/app/middlewares/errorhandler.middleware';
import { MessageCategory } from 'src/app/models/message-category.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessageCategoryService {

  private messageCategoryUrl = `${environment.baseUrl}/message_category`;

  constructor(private http: HttpClient) { }

  /**
   * @description get all MessageCategory in a message.
   * @returns {Observable<MessageCategory>[]}
   * @memberof MessageCategoryService
   */
  getAllMessageCategories = (query: any): Observable<any> => {
    return this.http.get<any>(this.messageCategoryUrl, { params: query }).pipe(
      map((response) => response['data']),
      catchError((err) => observableHandleError(err))
    );
  };

  /**
   * @description get MessageCategory by id.
   * @returns {Observable<MessageCategory>}
   * @memberof MessageCategoryService
   */
  getMessageCategoryById = (messagecategoryid: string): Observable<any> => {
    const url = `${this.messageCategoryUrl}/${messagecategoryid}`;
    return this.http.get<any>(url).pipe(
      map((response) => response['data']),
      catchError((err) => observableHandleError(err))
    );
  };

  /**
   * @description create new MessageCategory.
   * @returns {Observable<MessageCategory>}
   * @memberof MessageCategoryService
   */
  createMessageCategory = (messageCategory: MessageCategory): Observable<any> => {
    return this.http.post<any>(this.messageCategoryUrl, messageCategory).pipe(
      map((response) => response['data']),
      catchError((err) => observableHandleError(err))
    );
  };

  /**
   * @description update MessageCategory by id.
   * @returns {Observable<MessageCategory>}
   * @memberof MessageCategoryService
   */
  updateMessageCategoryById(messageCategory: MessageCategory): Observable<MessageCategory> {
    const url = `${this.messageCategoryUrl}/${messageCategory._id}`;
    return this.http.put<MessageCategory>(url, messageCategory).pipe(catchError((err) => observableHandleError(err)));
  }

  /**
   * @description delete MessageCategory by id.
   * @returns {Observable<{}>}
   * @memberof MessageCategoryService
   */
  deleteMessageCategoryById(messagecategoryid: string): Observable<{}> {
    const url = `${this.messageCategoryUrl}/${messagecategoryid}`;
    return this.http.delete<{}>(url).pipe(catchError((err) => observableHandleError(err)));
  }
}
