import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialCallComponent } from './dial-call.component';

describe('DialCallComponent', () => {
  let component: DialCallComponent;
  let fixture: ComponentFixture<DialCallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialCallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
