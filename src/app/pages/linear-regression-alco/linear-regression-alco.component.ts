import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Service } from 'src/app/service.service';

@Component({
  selector: 'app-linear-regression-alco',
  templateUrl: './linear-regression-alco.component.html',
  styleUrls: ['./linear-regression-alco.component.scss']
})
export class LinearRegressionAlcoComponent implements OnInit {
  predictionForm: FormGroup;
  result: any;
  error: string;

  constructor(private fb: FormBuilder, private predictionService: Service) {}

  ngOnInit(): void {
    this.predictionForm = this.fb.group({
      Humidite: ['', Validators.required],
      Proteine: ['', Validators.required],
      Durete: ['', Validators.required],
      Aw: ['', Validators.required],
      Fine: ['', Validators.required],
      Cendre: ['', Validators.required],
      Fibre: ['', Validators.required],
      Amidon: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.predictionForm.valid) {
      this.predictionService.getPredictionLinearReg(this.predictionForm.value).subscribe({
        next: (response) => {
          this.result = response;
          this.error = '';
        },
        error: (err) => {
          this.error = 'Failed to get prediction: ' + err.message;
          this.result = null;
        }
      });
    }
  }
}
