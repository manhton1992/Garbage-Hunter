import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/internal/operators';
import { observableHandleError } from 'src/app/middlewares/errorhandler.middleware';
import { Category } from 'src/app/models/category.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categoryUrl = `${environment.baseUrl}/categories`;
  public categories: Category[] = [];

  constructor(private http: HttpClient) { }


  /**
   * @description get all categories in a message.
   * @returns {Observable<Category>[]}
   * @memberof CategoryService
   */
  getAllCategories = (): Observable<any> => {
    return this.http.get<any>(this.categoryUrl).pipe(
      map((response) => response['data']),
      catchError((err) => observableHandleError(err))
    );
  };

  /**
   * @description get Category by id.
   * @returns {Observable<Message>}
   * @memberof CategoryService
   */
  getCategoryById = (categoryid: string): Observable<any> => {
    const url = `${this.categoryUrl}/${categoryid}`;
    return this.http.get<any>(url).pipe(
      map((response) => response['data']),
      catchError((err) => observableHandleError(err))
    );
  };

  /**
   * @description create new Category.
   * @returns {Observable<Category>}
   * @memberof CategoryService
   */
  createCategory = (category: Category): Observable<any> => {
    return this.http.post<any>(this.categoryUrl, category).pipe(
      map((response) => response['data']),
      catchError((err) => observableHandleError(err))
    );
  };

  /**
   * @description update Category by id.
   * @returns {Observable<Category>}
   * @memberof CategoryService
   */
  updateCategoryById(category: Category): Observable<Category> {
    const url = `${this.categoryUrl}/${category._id}`;
    return this.http.put<Category>(url, category).pipe(catchError((err) => observableHandleError(err)));
  }

  /**
   * @description delete Category by id.
   * @returns {Observable<{}>}
   * @memberof CategoryService
   */
  deleteCategoryById(categoryid: string): Observable<{}> {
    const url = `${this.categoryUrl}/${categoryid}`;
    return this.http.delete<{}>(url).pipe(catchError((err) => observableHandleError(err)));
  }
}
