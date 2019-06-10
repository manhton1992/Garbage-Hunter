import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/internal/operators';
import { observableHandleError } from 'src/app/middlewares/errorhandler.middleware';
import { Category } from 'src/app/models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categoryUrl = 'http://localhost:3000/api/categories';

  constructor(private http: HttpClient) { }

  /**
   * @description get all categories in a message.
   * @returns {Observable<Category>[]}
   * @memberof CategoryService
   */
  getAllCategories = (query: any): Observable<Category[]> => {
    return this.http.get<Category[]>(this.categoryUrl,{ params: query }).pipe(
      map((response) => response['data']['docs']),
      catchError((err) => observableHandleError(err))
    );
  };

  /**
   * @description get Category by id.
   * @returns {Observable<Message>}
   * @memberof CategoryService
   */
  getCategoryById = (categoryid: string): Observable<Category> => {
    const url = `${this.categoryUrl}/${categoryid}`;
    return this.http.get<Category>(url).pipe(
      map((response) => response['data']['docs']),
      catchError((err) => observableHandleError(err))
    );
  };

  /**
   * @description create new Category.
   * @returns {Observable<Category>}
   * @memberof CategoryService
   */
  createCategory = (category: Category): Observable<Category> => {
    const url = `${this.categoryUrl}`;
    return this.http.post<Category>(url, category).pipe(
      map((response) => response['data']['docs']),
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
