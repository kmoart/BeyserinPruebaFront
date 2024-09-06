import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { IngresoInfoComponent } from './pages/ingreso-info/ingreso-info.component';
import { ResumenPageComponent } from './pages/resumen-page/resumen-page.component';

const routes: Routes = [
  {
    path:  '',
    component: LayoutPageComponent,
    children: [
      {
        path: 'ingresar-info', component: IngresoInfoComponent
      },
      {
        path: 'resumen/:id', component: ResumenPageComponent
      },
      {
        path:'**', redirectTo: 'ingresar-info'
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PantallasRoutingModule { }
