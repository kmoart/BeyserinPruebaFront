import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { IngresoInfoComponent } from './ingreso-info.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserService } from '../../services/user.service';
import { of, throwError } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from '../../interfaces/user.interface';

describe('IngresoInfoComponent', () => {
  let component: IngresoInfoComponent;
  let fixture: ComponentFixture<IngresoInfoComponent>;

  let userServiceMock: jasmine.SpyObj<UserService>;

  beforeEach(
    waitForAsync(() => {

     userServiceMock = jasmine.createSpyObj('UserService',['getUserById']);

     TestBed.configureTestingModule({
       imports:[
         HttpClientTestingModule
       ],
       declarations: [
        IngresoInfoComponent
       ],
       providers:[
         {provide: UserService, useValue: userServiceMock }
       ],
       schemas: [
         CUSTOM_ELEMENTS_SCHEMA,
         NO_ERRORS_SCHEMA
       ]
     }).compileComponents();
    })
  );

  beforeEach( () => {
          fixture = TestBed.createComponent(IngresoInfoComponent);
          component = fixture.componentInstance;

          userServiceMock = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
          fixture.detectChanges();

          component.userForm = new FormGroup({
            id: new FormControl('001'),
            idType: new FormControl('C')
          });
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('form invalid when empty', () => {
    component.userForm.controls.id.setValue('');
    component.userForm.controls.idType.setValue('');
    expect(component.onSubmit).toHaveBeenCalledTimes(1);
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

      userServiceMock.getUserById.and.returnValue(of(user));

      component.onSubmit();

      expect(userServiceMock.getUserById).toHaveBeenCalled();
      expect(component.user).toEqual(user[0]);
  });
});
