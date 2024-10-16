import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environments } from '../../../environments/environments';
import { map, Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';


@Injectable({providedIn: 'root'})
export class UserService {

  private baseUrl:string = environments.baseUrl;

  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<User[]>{
      return this.httpClient.get<User[]>(`${this.baseUrl}/users`);
  }

  getUserByIdAndType( id: string, idType: string ): Observable<User>{
    /*let queryParams = new HttpParams();*/
    console.log('id', id);
    console.log('idType', idType);
    /*queryParams = queryParams.append('id', String(id));
    queryParams = queryParams.append('idType', String(idType));
    console.log('In service queryParams', queryParams);
    return this.httpClient.get<User[]>(`${this.baseUrl}/users`,{params: queryParams})*/
    return this.httpClient.get<User>(`${this.baseUrl}/api/users/${ id }/${ idType }`);
  }

  addUser( user: User): Observable<User>{
      return this.httpClient.post<User>(`${this.baseUrl}/users`, user)
  }

}
