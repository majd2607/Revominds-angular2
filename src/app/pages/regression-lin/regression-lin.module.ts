import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { RegressionLinRoutingModule } from './regression-lin-routing.module';
import { RegressionLinComponent } from './regression-lin.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [RegressionLinComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: RegressionLinComponent,
      },
    ]),
    RegressionLinRoutingModule,FormsModule
  ]
})
export class RegressionLinModule { }
