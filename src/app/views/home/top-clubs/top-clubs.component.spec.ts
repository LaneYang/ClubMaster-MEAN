import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopClubsComponent } from './top-clubs.component';

describe('TopClubsComponent', () => {
  let component: TopClubsComponent;
  let fixture: ComponentFixture<TopClubsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopClubsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopClubsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
