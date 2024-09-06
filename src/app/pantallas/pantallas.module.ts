import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PantallasRoutingModule } from './pantallas-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IngresoInfoComponent } from './pages/ingreso-info/ingreso-info.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ResumenPageComponent } from './pages/resumen-page/resumen-page.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    IngresoInfoComponent,
    LayoutPageComponent,
    ResumenPageComponent
  ],
  imports: [
    CommonModule,
    PantallasRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class PantallasModule { }
