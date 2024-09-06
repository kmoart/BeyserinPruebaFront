import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';

const routes: Routes = [
  {
  path: 'auth',
  loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule),
  },
  {
    path: 'pantallas',
    loadChildren: () => import('./pantallas/pantallas.module').then( m => m.PantallasModule),
  },
  {
    path: '404',
    component: Error404PageComponent
  },
  {
    path:'',
    redirectTo: 'pantallas',
    pathMatch: 'full'
  },
  {
    path:'**',
    redirectTo: '404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
