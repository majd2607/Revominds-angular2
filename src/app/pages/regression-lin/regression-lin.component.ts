import { Component } from '@angular/core';
import { Service } from 'src/app/service.service';

@Component({
  selector: 'app-regression-lin',
  templateUrl: './regression-lin.component.html',
  styleUrls: ['./regression-lin.component.scss']
})
export class RegressionLinComponent {
    formData = {
      Qt_BL_qx: null
    };
    prediction: number;
  
    constructor(private randomForestService: Service) { }
  
    predictRandomForest() {
      this.randomForestService.predictRandomForest(this.formData)
        .subscribe(response => {
          this.prediction = response.prediction[0];
        });
    }

}
