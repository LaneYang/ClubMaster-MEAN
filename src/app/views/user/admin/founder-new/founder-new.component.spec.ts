import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FounderNewComponent } from './founder-new.component';

describe('FounderNewComponent', () => {
  let component: FounderNewComponent;
  let fixture: ComponentFixture<FounderNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FounderNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FounderNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
