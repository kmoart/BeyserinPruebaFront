import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/user.interface';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-resumen-page',
  templateUrl: './resumen-page.component.html',
  styles: ``
})
export class ResumenPageComponent implements OnInit{

  public user!: User;

  id!: string;
  idType!: string;

  public resumeForm = new FormGroup({
    firstSurname: new FormControl<string>({ value:'', disabled: true}),
    firstName: new FormControl<string>({ value:'', disabled: true}),
  });

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private route: Router){

  }

  ngOnInit(): void {
    this.getUserByIdAndIdType();

  }

  getUserByIdAndIdType(){
   this.activatedRoute.queryParams
    .subscribe( params =>{
      this.id = params['id'];
      this.idType = params['idType'];
    })

    this.userService.getUserByIdAndType( this.id, this.idType )
      .subscribe( (user:User) => {
          this.user = user;
          console.log(this.user);
          this.resumeForm.controls['firstSurname'].setValue(user.primerApellido);
          this.resumeForm.controls['firstName'].setValue(user.primerNombre);
      });
  }
}
