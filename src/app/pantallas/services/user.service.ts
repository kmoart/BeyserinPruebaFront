import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from '../../../environments/environments';
import { catchError, Observable, of } from 'rxjs';
import { User } from '../interfaces/user.interface';


@Injectable({providedIn: 'root'})
export class UserService {

  private baseUrl:string = environments.baseUrl;

  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<User[]>{
      return this.httpClient.get<User[]>(`${this.baseUrl}/users`);
  }

  getUserById( id: string ): Observable<User | undefined>{
      return this.httpClient.get<User>(`${this.baseUrl}/users/${ id }`)
      .pipe(
        catchError( error => of(undefined))
      )
  }

  addUser( user: User): Observable<User>{
      return this.httpClient.post<User>(`${this.baseUrl}/users`, user)
  }

}
