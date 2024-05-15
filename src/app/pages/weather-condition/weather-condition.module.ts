import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { WeatherConditionRoutingModule } from './weather-condition-routing.module';
import { WeatherConditionComponent } from './weather-condition.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [WeatherConditionComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: WeatherConditionComponent,
      },
    ]),
    WeatherConditionRoutingModule,
    FormsModule
  ]
})
export class WeatherConditionModule { }
