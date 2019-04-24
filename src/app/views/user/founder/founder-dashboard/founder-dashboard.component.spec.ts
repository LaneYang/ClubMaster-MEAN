import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FounderDashboardComponent } from './founder-dashboard.component';

describe('FounderDashboardComponent', () => {
  let component: FounderDashboardComponent;
  let fixture: ComponentFixture<FounderDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FounderDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FounderDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
