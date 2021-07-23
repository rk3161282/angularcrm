import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallinputComponent } from './callinput.component';

describe('CallinputComponent', () => {
  let component: CallinputComponent;
  let fixture: ComponentFixture<CallinputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallinputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallinputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
