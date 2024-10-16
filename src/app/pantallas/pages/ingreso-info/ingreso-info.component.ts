import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-ingreso-info',
  templateUrl: './ingreso-info.component.html',
  styles: ``
})
export class IngresoInfoComponent {

  user!: User;
  isDisabled: boolean = true;
  number: Number = 0;

  public userForm = new FormGroup({
    id: new FormControl<string>('',[ Validators.required,Validators.minLength(8),Validators.maxLength(11)]),
    idType: new FormControl<string>('',[ Validators.required,])
  });

  constructor(
    private userService: UserService,
    private router: Router){

  }

  onSubmit(): void{
    console.log(this.userForm.controls.id.value);
    console.log(this.userForm.controls.idType.value);
    if(this.userForm.invalid){
      return
    }

    console.log(this.userForm);
    this.userService.getUserByIdAndType(this.userForm.controls.id.value!,this.userForm.controls.idType.value! )
    .subscribe( user =>{
      this.user = user;
      this.router.navigate(
        ['/pantallas/resumen'],
        { queryParams :
          { id:this.userForm.controls.id.value! ,
            idType: this.userForm.controls.idType.value! }});
          console.log(user);
    });
  }

  isAnswered(): boolean {
    if(this.userForm.valid){
      return true;
    }else{
      return false;
    }
  }
}
