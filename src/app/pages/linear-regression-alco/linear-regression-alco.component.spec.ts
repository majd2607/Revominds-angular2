import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinearRegressionAlcoComponent } from './linear-regression-alco.component';

describe('LinearRegressionAlcoComponent', () => {
  let component: LinearRegressionAlcoComponent;
  let fixture: ComponentFixture<LinearRegressionAlcoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LinearRegressionAlcoComponent]
    });
    fixture = TestBed.createComponent(LinearRegressionAlcoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
