import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/internal/operators';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';
import { observableHandleError } from 'src/app/middlewares/errorhandler.middleware';
import { FlashService } from '../flash/flash.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userUrl = `${environment.baseUrl}/users`;
  private userLoginUrl = `${this.userUrl}/login`;
  private userLoginByTokenUrl = `${this.userUrl}/login`;
  private userRegisterUrl = `${this.userUrl}/register`;
  private userUpdateUrl = `${this.userUrl}/update`;
  private userDeleteUrl = `${this.userUrl}/delete`;

  public user: User = null;
  private users: User[];

  constructor(private http: HttpClient, private flashService: FlashService) {}

  /**
   * get all users.
   * Just feature just for admin.
   * We need compare this user id with admin id in backend.
   */
  getAllUser(token: string) {
    const url = `${this.userUrl}/get_all/${token}`;
    return this.http.get<User[]>(url).pipe(
      map((response) => response['data']),
      catchError((err) => observableHandleError(err))
    );
  }

  getUserById = (userid: string): Observable<User> => {
    const url = `${this.userUrl}/${userid}`;
    return this.http.get<User>(url).pipe(
      map((response) => response['data']['docs']),
      catchError((err) => observableHandleError(err))
    );
  };

  /**
   * get user/ login
   * @param email
   * @param password
   */
  login(email: string, password: string) {
    const url = `${this.userLoginUrl}`;
    return this.http
      .post<User>(url, { email, password })
      .pipe(map((response) => response['data'], catchError((err) => observableHandleError(err))));
  }

  /**
   * create a new user instance
   * @param activity
   * @returns
   */
  register(user: any) {
    return this.http.post<string>(this.userRegisterUrl, user).pipe(
      map((response) => response['data']),
      catchError((err) => observableHandleError(err))
    );
  }

  /**
   * update user information
   * @param token
   * @param user
   */
  updateUserWithToken(token: string, user: User): Observable<{}> {
    const url = `${this.userUpdateUrl}/${token}`;
    return this.http.put<User>(url, user).pipe(map((response) => response['data']));
  }

  /**
   * delete user
   * @param token
   */
  deleteUserWithToken(token: string): Observable<{}> {
    const url = `${this.userDeleteUrl}/${token}`;
    return this.http.delete<User>(url).pipe(
      map((response) => response['data']),
      catchError((err) => observableHandleError(err))
    );
  }

  /**
   * check if user have token in local storage
   * if have, add user in user service
   * that mean user log in automatically
   */
  authenticate() {
    const userDataString = localStorage.getItem('currentUser');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      if (userData.token) {
        const url = `${this.userLoginByTokenUrl}/${userData.token}`;
        return this.http.get<User>(url).pipe(
          map((response) => response['data']),
          catchError((err) => observableHandleError(err))
        );
      }
    }
    return null;
  }

  logout() {
    this.user = null;
    localStorage.removeItem('currentUser');
    this.flashService.setFlashSuccess('you are logged out!');
    window.location.href = '/';
  }
}
