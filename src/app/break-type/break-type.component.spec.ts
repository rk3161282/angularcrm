import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreakTypeComponent } from './break-type.component';

describe('BreakTypeComponent', () => {
  let component: BreakTypeComponent;
  let fixture: ComponentFixture<BreakTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreakTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreakTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
