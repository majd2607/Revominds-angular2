import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegressionLinComponent } from './regression-lin.component';

describe('RegressionLinComponent', () => {
  let component: RegressionLinComponent;
  let fixture: ComponentFixture<RegressionLinComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegressionLinComponent]
    });
    fixture = TestBed.createComponent(RegressionLinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
