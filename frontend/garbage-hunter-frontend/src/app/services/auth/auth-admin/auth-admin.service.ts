import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminService {

  private url = `${environment.baseUrl}/users/login`

  constructor(private router: Router, private http: HttpClient) {}

  canActivate = (): Observable<boolean> => {
    let token = JSON.parse(localStorage.getItem('currentUser')).token;
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
  };
}
