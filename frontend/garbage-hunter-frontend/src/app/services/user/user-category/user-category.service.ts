import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/internal/operators';
import { observableHandleError } from 'src/app/middlewares/errorhandler.middleware';
import { UserCategory } from 'src/app/models/user-category.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserCategoryService {

  private userCategoryUrl = `${environment.baseUrl}/user_category`;

  constructor(private http: HttpClient) { }

  /**
   * @description get all UserCategory in a message.
   * @returns {Observable<UserCategory>[]}
   * @memberof UserCategoryService
   */
  getAllUserCategories = (query: any): Observable<UserCategory[]> => {
    return this.http.get<UserCategory[]>(this.userCategoryUrl, { params: query }).pipe(
      map((response) => response['data']['docs']),
      catchError((err) => observableHandleError(err))
    );
  };


   /**
   * @description get UserCategory by category id.
   * @returns {Observable<UserCategory>}
   * @memberof UserCategoryService
   */
  getUserCategoryByCategoryId = (categoryid: string): Observable<UserCategory[]> => {
    const url = `${this.userCategoryUrl}/${categoryid}`;
    return this.http.get<UserCategory[]>(url).pipe(
      map((response) => response['data']['docs']),
      catchError((err) => observableHandleError(err))
    );
  };


  /**
   * @description create new UserCategory.
   * @returns {Observable<UserCategory>}
   * @memberof UserCategoryService
   */
  createUserCategory = (userCategory: UserCategory): Observable<UserCategory> => {
    return this.http.post<UserCategory>(this.userCategoryUrl, userCategory).pipe(
      map((response) => response['data']['docs']),
      catchError((err) => observableHandleError(err))
    );
  };

  /**
   * @description update UserCategory by id.
   * @returns {Observable<UserCategory>}
   * @memberof UserCategoryService
   */
  updateUserCategoryById(userCategory: UserCategory): Observable<UserCategory> {
    const url = `${this.userCategoryUrl}/${userCategory._id}`;
    return this.http.put<UserCategory>(url, userCategory).pipe(catchError((err) => observableHandleError(err)));
  }

  /**
   * @description delete UserCategory by id.
   * @returns {Observable<{}>}
   * @memberof UserCategoryService
   */
  deleteUserCategoryById(usercategoryid: string): Observable<{}> {
    const url = `${this.userCategoryUrl}/${usercategoryid}`;
    return this.http.delete<{}>(url).pipe(catchError((err) => observableHandleError(err)));
  }
}
