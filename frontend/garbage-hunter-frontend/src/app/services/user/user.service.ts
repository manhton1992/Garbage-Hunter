import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = "http://localhost:3000/api/users"

  constructor(private http: HttpClient) { }


/**
 * get all users. 
 * Just feature just for admin. 
 * We need compare this user id with admin id in backend.
 * @param id 
 */
getAllUser(id: string){

  const url = `${this.userUrl}/get_all/${id}`; 
  return this.http.get<User[]>(url).pipe(map(response => response['data']));
}

/**
 * get user/ login
 * @param email 
 * @param password 
 */
  getUser(email: string, password: string){

    const url = `${this.userUrl}?email=${email}&&password=${password}`; 
    return this.http.get<User>(url).pipe(map(response => response['data']));
  }

    /**
   * create a new user instance
   * @param activity 
   * @returns
   */
  addUser(user: any){
    return this.http.post<string>(this.userUrl,user)
    .pipe(map(response => response['data']));
  
  }

/**
 * update user information
 * @param id 
 * @param user 
 */
updateUser(id: string, user: User): Observable<{}>{
  const url = `${this.userUrl}/${id}`;
  return this.http.put<User>(url, user)
  .pipe(map(response => response['data']));
}

  /**
 * delete user 
 * @param id 
 */
deleteUser(id: string): Observable<{}>{
  const url = `${this.userUrl}/${id}`;
  return this.http.delete<User>(url)
  .pipe(map(response => response['data']));
}

}

