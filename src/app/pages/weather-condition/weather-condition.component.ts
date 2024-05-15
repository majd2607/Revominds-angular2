import { Component } from '@angular/core';
import { Service } from 'src/app/service.service';

@Component({
  selector: 'app-weather-condition',
  templateUrl: './weather-condition.component.html',
  styleUrls: ['./weather-condition.component.scss']
})
export class WeatherConditionComponent {
  responseData: any;
  travelForm: any = {}; // Form object to store user input

  constructor(private adjustService: Service) { }

  adjustTime() {
    const travelData = [{
      destination_id: this.travelForm.destination_id,
      duree_trajet: this.travelForm.duree_trajet
    }];

    this.adjustService.adjustTravelTime(travelData).subscribe(response => {
      console.log(response);
      this.responseData = response; // Assign response to responseData
    }, error => {
      console.error('Error adjusting travel time:', error);
      // Handle error
    });
  }

}
