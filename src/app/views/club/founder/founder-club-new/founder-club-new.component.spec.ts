import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FounderClubNewComponent } from './founder-club-new.component';

describe('FounderClubNewComponent', () => {
  let component: FounderClubNewComponent;
  let fixture: ComponentFixture<FounderClubNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FounderClubNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FounderClubNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
