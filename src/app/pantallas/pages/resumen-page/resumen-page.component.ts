import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/user.interface';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-resumen-page',
  templateUrl: './resumen-page.component.html',
  styles: ``
})
export class ResumenPageComponent {

  public user?: User;

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router){

  }
  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this.userService.getUserById( id ) ),
      )
      .subscribe( user => {
        if ( !user ) return this.router.navigate(['/pantallas/ingresar-info']);

        this.user = user;
        return;
      });


  }
}
