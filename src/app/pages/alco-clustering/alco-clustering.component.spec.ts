import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlcoClusteringComponent } from './alco-clustering.component';

describe('AlcoClusteringComponent', () => {
  let component: AlcoClusteringComponent;
  let fixture: ComponentFixture<AlcoClusteringComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlcoClusteringComponent]
    });
    fixture = TestBed.createComponent(AlcoClusteringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
