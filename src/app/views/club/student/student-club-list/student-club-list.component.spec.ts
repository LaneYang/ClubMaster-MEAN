import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentClubListComponent } from './student-club-list.component';

describe('StudentClubListComponent', () => {
  let component: StudentClubListComponent;
  let fixture: ComponentFixture<StudentClubListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentClubListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentClubListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
