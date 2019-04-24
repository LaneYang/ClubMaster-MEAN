import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FounderClubListComponent } from './founder-club-list.component';

describe('FounderClubListComponent', () => {
  let component: FounderClubListComponent;
  let fixture: ComponentFixture<FounderClubListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FounderClubListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FounderClubListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
