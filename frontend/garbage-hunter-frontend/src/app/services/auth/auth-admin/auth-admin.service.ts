import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthAdminService implements CanActivate {
  private url = `${environment.baseUrl}/users/login`;

  constructor(private router: Router, private http: HttpClient) {}

  canActivate = (): Observable<boolean> => {
    let currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
    let token = JSON.parse(currentUser).token;
      const url = `${this.url}/${token}`;
      return this.http.get<Boolean>(url).pipe(
        map((response) => {
          if (response['data']['docs']['isAdmin']) {
            return true;
          } else {
            this.router.navigateByUrl('/login');
            return false;
          }
        })
      );
    } else {
      this.router.navigateByUrl('/login');
    }
  };
}
