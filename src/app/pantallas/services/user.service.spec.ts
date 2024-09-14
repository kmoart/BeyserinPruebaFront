import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from "@angular/core/testing";
import { UserService } from "./user.service";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { environments } from '../../../environments/environments';

 const baseUrl = environments.baseUrl;

const listUsers: User[] = [];

const user: User[] =[{
  id:             '001',
  idtype:         'C',
  primerNombre:   'Camilo',
  segundoNombre:  'Esteban',
  primerApellido: 'Aranda',
  segundoApellido: 'Díaz',
  Telefono:        '3123456789',
  Direccion:       'Av Siempre Viva',
  CiudadResidencia:'Bogotá D.C.'
}];

describe('userService', () =>{
    let userService : UserService;
    let httpMock: HttpTestingController;

    beforeEach( () =>{
        TestBed.configureTestingModule({
            imports:[
              HttpClientTestingModule
            ],
            providers: [
              UserService
            ],
            schemas : [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        });
    });

    beforeEach( () =>{
      userService = TestBed.inject(UserService);
      httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach( () =>{
        httpMock.verify();
    });

    it('should be created', () =>{
        expect( userService ).toBeTruthy();
    });

    it('getUsers return a list of users and does a get method', () =>{
        userService.getUsers().subscribe(( resp: User[]) =>{
            expect(resp).toEqual(listUsers);// Verificamos que el resultado devuelva el tipo adecuado
        });

        const  request = httpMock.expectOne(`${baseUrl}/users`);
        expect(request.request.method).toBe('GET');
        request.flush(listUsers);//Nos devuelve un observable de tipo listUsers
    });


    it('getUser by Id does a get method', () =>{
      userService.getUserById(user[0].id, user[0].idtype).subscribe(( resp: User[] | undefined) =>{
      //userService.getUserById(user.id).subscribe(( resp: User | undefined) =>{
          expect(resp).toEqual(user);// Verificamos que el resultado devuelva el tipo adecuado
      });

      const  request = httpMock.expectOne(`${baseUrl}/users/${ user[0].id  }`);
      expect(request.request.method).toBe('GET');
      request.flush( user );//Nos devuelve un observable de tipo user
    });

    it('addUser does a post method', () =>{
      userService.addUser(user[0]).subscribe(( resp: User ) =>{
          expect(resp).toEqual(user[0]);// Verificamos que el resultado devuelva el tipo adecuado
      });

      const  request = httpMock.expectOne(`${baseUrl}/users`);
      expect(request.request.method).toBe('POST');
      request.flush( user );//Nos devuelve un observable de tipo user
    });
});
