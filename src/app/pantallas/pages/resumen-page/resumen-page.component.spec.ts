import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ResumenPageComponent } from './resumen-page.component';
import { UserService } from '../../services/user.service';
import { HttpClientTestingModule, provideHttpClientTesting } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BehaviorSubject, of, Subject, switchMap, throwError } from 'rxjs';
import { User } from '../../interfaces/user.interface';
import { ActivatedRoute, Route } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

describe('ResumenPageComponent', () => {

  let component: ResumenPageComponent;
  let fixture: ComponentFixture<ResumenPageComponent>;

  let userServiceMock: jasmine.SpyObj<UserService>;
  let activatedRouteMock: jasmine.SpyObj<ActivatedRoute>;


  beforeEach(
    waitForAsync(() => {

     userServiceMock = jasmine.createSpyObj('UserService',['getUserById']);
     const params = new BehaviorSubject({ param: 'valueOf' });
     activatedRouteMock = jasmine.createSpyObj('ActivatedRoute',['get']);
     TestBed.configureTestingModule({
       imports:[
         HttpClientTestingModule,

       ],
       declarations: [
        ResumenPageComponent
       ],
       providers:[
         {provide: UserService, useValue: userServiceMock },
         {provide: ActivatedRoute, useValue: activatedRouteMock},

       ],
       schemas: [
         CUSTOM_ELEMENTS_SCHEMA,
         NO_ERRORS_SCHEMA
       ]
     }).compileComponents();
    })
  );

  beforeEach( () => {
      fixture = TestBed.createComponent(ResumenPageComponent);
      component = fixture.componentInstance;

      userServiceMock = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
      activatedRouteMock = TestBed.inject(ActivatedRoute) as jasmine.SpyObj<ActivatedRoute>;
      fixture.detectChanges();

      component.resumeForm = new FormGroup({
        firstSurname: new FormControl('Aranda'),
        firstName: new FormControl('Camilo')
      });
  });

  it('should create', () => {
    expect(component).toBeTruthy();

  });

  it('should get user by Id',() =>{

    const user: User[] =[ {
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

    const params = new BehaviorSubject({ param: 'newValueOf' });
    component['activatedRoute'].params = params;

    userServiceMock.getUserById.and.returnValue(of(user));

    component.ngOnInit();
    component.getUserByIdAndIdType();

    expect(userServiceMock.getUserById).toHaveBeenCalled();
    expect(component.user).toEqual(user[0]);
    expect(component.resumeForm.controls['firstSurname'].value).toBe('Aranda');
    expect(component.resumeForm.controls['firstName'].value).toBe('Camilo');
  });

});
