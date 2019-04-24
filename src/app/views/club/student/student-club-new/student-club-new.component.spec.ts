import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentClubNewComponent } from './student-club-new.component';

describe('StudentClubNewComponent', () => {
  let component: StudentClubNewComponent;
  let fixture: ComponentFixture<StudentClubNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentClubNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentClubNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
