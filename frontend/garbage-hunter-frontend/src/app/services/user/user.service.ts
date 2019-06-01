import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = "http://localhost:3000/api/users";
  private userLoginUrl = `${this.userUrl}/login`;
  private userRegisterUrl = `${this.userUrl}/register`;
  private userUpdateUrl = `${this.userUrl}/update`;
  private userDeleleUrl = `${this.userUrl}/delete`;

  public user: User = null;
  private users: User[];


  constructor(private http: HttpClient) { }


/**
 * get all users. 
 * Just feature just for admin. 
 * We need compare this user id with admin id in backend.
 * @param token 
 */
getAllUser(token: string){

  const url = `${this.userUrl}/get_all/${token}`; 
  return this.http.get<User[]>(url).pipe(map(response => response['data']));
}

/**
 * get user/ login
 * @param email 
 * @param password 
 */
login(email: string, password: string){

  const url = `${this.userLoginUrl}?email=${email}&&password=${password}`; 
  return this.http.get<User>(url).pipe(map(response => response['data']));
}

  /**
 * create a new user instance
 * @param activity 
 * @returns
 */
register(user: any){
  return this.http.post<string>(this.userRegisterUrl,user)
  .pipe(map(response => response['data']));

}

/**
 * update user information
 * @param token 
 * @param user 
 */
updateUserWithToken(token: string, user: User): Observable<{}>{
  const url = `${this.userUpdateUrl}/${token}`;
  return this.http.put<User>(url, user)
  .pipe(map(response => response['data']));
}

  /**
 * delete user 
 * @param token 
 */
deleteUserWithToken(token: string): Observable<{}>{
  const url = `${this.userDeleleUrl}/${token}`;
  return this.http.delete<User>(url)
  .pipe(map(response => response['data']));
}

/**
 * check if user have token in local storage
 * if have, add user in user service
 * that mean user log in automatically
 */
authenticate(){
  let userDataString = localStorage.getItem("currentUser");
  if (userDataString){
    let userData = JSON.parse(userDataString);
    this.user = userData.docs;
    console.log("this user: " + JSON.stringify(this.user));
    } 
  }
}


