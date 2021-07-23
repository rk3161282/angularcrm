import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallscreenComponent } from './callscreen.component';

describe('CallscreenComponent', () => {
  let component: CallscreenComponent;
  let fixture: ComponentFixture<CallscreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallscreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
