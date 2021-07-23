import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallOngoingCallComponent } from './call-ongoing-call.component';

describe('CallOngoingCallComponent', () => {
  let component: CallOngoingCallComponent;
  let fixture: ComponentFixture<CallOngoingCallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallOngoingCallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallOngoingCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
