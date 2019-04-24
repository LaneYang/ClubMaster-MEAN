import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FounderEditComponent } from './founder-edit.component';

describe('FounderEditComponent', () => {
  let component: FounderEditComponent;
  let fixture: ComponentFixture<FounderEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FounderEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FounderEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
