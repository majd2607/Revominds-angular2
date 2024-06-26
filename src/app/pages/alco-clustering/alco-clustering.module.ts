import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlcoClusteringRoutingModule } from './alco-clustering-routing.module';
import { AlcoClusteringComponent } from './alco-clustering.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [AlcoClusteringComponent],
  imports: [
    CommonModule,
    AlcoClusteringRoutingModule,
    RouterModule.forChild([
      {
        path: '',
        component: AlcoClusteringComponent,
      },
  ]),
  FormsModule,
  ReactiveFormsModule
  ]
})
export class AlcoClusteringModule { }
