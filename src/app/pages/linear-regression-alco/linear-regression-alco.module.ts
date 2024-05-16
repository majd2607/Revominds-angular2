import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LinearRegressionAlcoRoutingModule } from './linear-regression-alco-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LinearRegressionAlcoComponent } from './linear-regression-alco.component';

@NgModule({
  declarations: [
    LinearRegressionAlcoComponent
  ],
  imports: [
    CommonModule,
    LinearRegressionAlcoRoutingModule,
    RouterModule.forChild([
      {
        path: '',
        component: LinearRegressionAlcoComponent,
      },
  ]),
  ReactiveFormsModule
  ]
})
export class LinearRegressionAlcoModule { }
