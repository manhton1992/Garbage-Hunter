import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthLoginService implements CanActivate {
  constructor(private router: Router) {}

  canActivate = (): boolean => {
    const isLoggedIn = localStorage.getItem('currentUser') ? true : false;
    if (!isLoggedIn) {
      this.router.navigateByUrl('/login');
    }
    return isLoggedIn;
  }
}
