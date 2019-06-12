import { Injectable } from '@angular/core';
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
  public categories: Category[] = [
    {
      _id: '1',
      name: 'chair'
    },
    {
      _id: '2',
      name: 'furniture'
    },
    {
      _id: '3',
      name: 'electronic'
    },
    {
      _id: '4',
      name: 'bed'
    },
    {
      _id: '5',
      name: 'table'
    },
    {
      _id: '6',
      name: 'sofa'
    },
  ];

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
    return this.http.post<Category>(this.categoryUrl, category).pipe(
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
