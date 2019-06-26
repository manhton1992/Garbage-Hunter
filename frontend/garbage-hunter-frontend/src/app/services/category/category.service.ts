import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/internal/operators';
import { observableHandleError } from 'src/app/middlewares/errorhandler.middleware';
import { Category } from 'src/app/models/category.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categoryUrl = `${environment.baseUrl}/categories`;
  public categories: Category[] = [];

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
   * @description get all categories in a message.
   */
  getAllCategories = (): Observable<Category[]> => {
    return this.http.get<Category[]>(this.categoryUrl).pipe(
      map((response) => response['data']['docs']),
      catchError((err) => observableHandleError(err))
    );
  };

  /**
   * @description get Category by id.
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
   */
  createCategory = (category: Category): Observable<Category> => {
    return this.http.post<Category>(this.categoryUrl, category, { headers: this.getHeader() }).pipe(
      map((response) => response['data']['docs']),
      catchError((err) => observableHandleError(err))
    );
  };

  /**
   * @description update Category by id.
   */
  updateCategoryById(category: Category): Observable<Category> {
    const url = `${this.categoryUrl}/${category._id}`;
    return this.http.put<Category>(url, category, { headers: this.getHeader() }).pipe(catchError((err) => observableHandleError(err)));
  }

  /**
   * @description delete Category by id.
   */
  deleteCategoryById(categoryid: string): Observable<{}> {
    const url = `${this.categoryUrl}/${categoryid}`;
    return this.http.delete<{}>(url, { headers: this.getHeader() }).pipe(catchError((err) => observableHandleError(err)));
  }
}
