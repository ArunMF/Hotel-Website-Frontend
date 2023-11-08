import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckAvailComponent } from './check-avail.component';

describe('CheckAvailComponent', () => {
  let component: CheckAvailComponent;
  let fixture: ComponentFixture<CheckAvailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckAvailComponent]
    });
    fixture = TestBed.createComponent(CheckAvailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
