import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Service } from 'src/app/service.service';

@Component({
  selector: 'app-alco-clustering',
  templateUrl: './alco-clustering.component.html',
  styleUrls: ['./alco-clustering.component.scss']
})
export class AlcoClusteringComponent {
  clusteringForm: FormGroup;
  result: any;
  error: string;

  constructor(private fb: FormBuilder, private predictionService: Service) {}

  ngOnInit(): void {
    this.clusteringForm = this.fb.group({
      humidite: ['', [Validators.required, Validators.min(0)]],
      fine: ['', [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit(): void {
    if (this.clusteringForm.valid) {
      this.predictionService.getClusteringAlco(this.clusteringForm.value).subscribe({
        next: (response) => {
          this.result = response;
          this.error = "";
        },
        error: (err) => {
          this.error = 'Failed to get clustering: ' + err.message;
          this.result = null;
        }
      });
    }
  }
}
