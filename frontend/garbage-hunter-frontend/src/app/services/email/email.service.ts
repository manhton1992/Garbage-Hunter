import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/internal/operators';
import { observableHandleError } from 'src/app/middlewares/errorhandler.middleware';

@Injectable({
  providedIn: 'root',
})

/**
 * this class represent Email Service.
 * Just send subscribe email when a matching message is created
 */
export class EmailService {
  constructor(private http: HttpClient) {}

  sendEmailSubscribe(userId: string, messageId: string): Observable<any> {
    const url = `${environment.baseUrl}/email?userId=${userId}&messageId=${messageId}`;
    return this.http.get<any>(url).pipe(
      map((response) => response['data']),
      catchError((err) => observableHandleError(err))
    );
  }
}
