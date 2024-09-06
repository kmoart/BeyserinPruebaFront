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

  req : boolean = false;
  req2 : boolean = false;
  isDisabled: boolean = true;

  public userForm = new FormGroup({
    id: new FormControl<string>('',[ Validators.required,Validators.minLength(8),Validators.maxLength(11)]),
    typeDocument: new FormControl<string>('',[ Validators.required,]),
  });

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router){

  }

  get currentProduct(): User {
    const user = this.userForm.value as User;

    return user;
  }

  onSubmit(): void{
    console.log(this.userForm.controls.id.value);

    if(this.userForm.invalid){
      this.req = true;
      this.req2 = true;
      return
    }

    this.userService.getUserById(this.userForm.controls.id.value!)
    .subscribe( user =>{
      this.router.navigate(['/pantallas/resumen', this.userForm.controls.id.value]);
        console.log(user);
    });
  }
}
