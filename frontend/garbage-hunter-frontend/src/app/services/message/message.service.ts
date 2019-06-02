import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/internal/operators';
import { Message } from 'src/app/models/message.model';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private messageUrl = 'http://localhost:3000/api/messages';

  constructor(private http: HttpClient) {}

  /**
   * @description get all messages.
   * @returns {Observable<Message>[]}
   * @memberof MessageService
   */
  getAllMessages = (): Observable<Message[]> => {
    return this.http
      .get<Message[]>(this.messageUrl)
      .pipe(map((response) => response['data']['docs']));
  }

  /**
   * @description get message by id.
   * @returns {Observable<Message>}
   * @memberof MessageService
   */
  getMessageById = (messageid: string): Observable<Message> => {
    const url = `${this.messageUrl}/${messageid}`;
    return this.http
      .get<Message>(url)
      .pipe(map((response) => response['data']['docs']));
  }

  /**
   * @description create new message.
   * @returns {Observable<Message>}
   * @memberof MessageService
   */
  createMessage = (message: Message): Observable<Message> => {
    return this.http
      .post<Message>(this.messageUrl, message)
      .pipe(map((response) => response['data']['docs']));
  }

  /**
   * @description update message by id.
   * @returns {Observable<Message>}
   * @memberof MessageService
   */
  updateMessage(message: Message): Observable<Message> {
    const url = `${this.messageUrl}/${message._id}`;
    return this.http
      .put<Message>(url, message)
      .pipe(catchError(err => this.handleError(err)));
  }

  /**
   * @description delet message by id.
   * @returns {Observable<{}>}
   * @memberof MessageService
   */
  deleteMessage(messageid: string): Observable<{}> {
    const url = `${this.messageUrl}/${messageid}`;
    return this.http
      .delete<{}>(url)
      .pipe(catchError(err => this.handleError(err)));
  }

  /**
   * @description error handling for update and delete message.
   * @private
   * @param {HttpErrorResponse} error
   * @returns
   * @memberof MessageService
   */
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
  /** 
   * TEST FUNCTION   
   */
  
  testGetAllMessages = (): Message[] => {
    return this.dummyData;
  }

  testGetMessageById = (messageid: string): Message => {
    return this.dummyData.find((element) => {
      return element._id == messageid;
    })
  }

  dummyData: Message[] = [
    {
      _id: "1",
      title: "test title 1",
      description: "test title 1",
      creatorid: 12345,
      lon: 8.634846210479736,
      lat: 49.869857346128846,
      address: "test address 1",
      available: true,
      archive: false,
      image: "https://cdn1.stuttgarter-zeitung.de/media.media.ec722513-be5c-474a-88d9-db2b05e31ccb.original1024.jpg",
      phone: 54321,
      created_at: new Date('2019-05-04'),
    },
    {
      _id: "2",
      title: "test title 2",
      description: "test title 2",
      creatorid: 12345,
      lon: 8.642849922180176,
      lat: 49.868004087002696,
      address: "test address 2",
      available: true,
      archive: false,
      image: "https://cdn1.stuttgarter-zeitung.de/media.media.ec722513-be5c-474a-88d9-db2b05e31ccb.original1024.jpg",
      phone: 54321,
      created_at: new Date('2019-05-01'),
    },
    {
      _id: "3",
      title: "test title 3",
      description: "test title 3",
      creatorid: 12345,
      lon: 8.631584644317627,
      lat: 49.86594329000284,
      address: "test address 3",
      available: true,
      archive: false,
      image: "https://cdn1.stuttgarter-zeitung.de/media.media.ec722513-be5c-474a-88d9-db2b05e31ccb.original1024.jpg",
      phone: 54321,
      created_at: new Date('2019-04-20'),
    },
    {
      _id: "4",
      title: "test title 4",
      description: "test title 4",
      creatorid: 12345,
      lon: 8.636863231658936,
      lat: 49.869207330501965,
      address: "test address 4",
      available: true,
      archive: false,
      image: "https://cdn1.stuttgarter-zeitung.de/media.media.ec722513-be5c-474a-88d9-db2b05e31ccb.original1024.jpg",
      phone: 54321,
      created_at: new Date('2019-05-04'),
    },
    {
      _id: "5",
      title: "test title 5",
      description: "test title 5",
      creatorid: 12345,
      lon: 8.637099266052246,
      lat: 49.86457398700499,
      address: "test address 5",
      available: true,
      archive: false,
      image: "https://cdn1.stuttgarter-zeitung.de/media.media.ec722513-be5c-474a-88d9-db2b05e31ccb.original1024.jpg",
      phone: 54321,
      created_at: new Date('2019-04-13'),
    },
    {
      _id: "6",
      title: "test title 6",
      description: "test title 6",
      creatorid: 12345,
      lon: 8.637871742248533,
      lat: 49.86844666280919,
      address: "test address 6",
      available: true,
      archive: false,
      image: "https://cdn1.stuttgarter-zeitung.de/media.media.ec722513-be5c-474a-88d9-db2b05e31ccb.original1024.jpg",
      phone: 54321,
      created_at: new Date('2019-04-13'),
    },
  ]
}
