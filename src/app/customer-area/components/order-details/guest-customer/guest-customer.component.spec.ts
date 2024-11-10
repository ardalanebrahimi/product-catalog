import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestCustomerComponent } from './guest-customer.component';

describe('GuestCustomerComponent', () => {
  let component: GuestCustomerComponent;
  let fixture: ComponentFixture<GuestCustomerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuestCustomerComponent]
    });
    fixture = TestBed.createComponent(GuestCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
