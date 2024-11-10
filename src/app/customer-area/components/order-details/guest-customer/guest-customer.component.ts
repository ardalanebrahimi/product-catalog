// src/app/components/guest-customer/guest-customer.component.ts
import { Component, Output, EventEmitter } from '@angular/core';
import { OrderDetailService } from '../order-detail.service';

@Component({
  selector: 'app-guest-customer',
  templateUrl: './guest-customer.component.html',
  styleUrls: ['./guest-customer.component.scss'],
})
export class GuestCustomerComponent {
  @Output() guestDetailsSubmitted = new EventEmitter<any>();

  order = {
    name: '',
    email: '',
    address: '',
    phone: '',
    notes: '',
  };

  constructor(public orderDetailService: OrderDetailService) {}

  submitOrderDetails() {
    this.orderDetailService.setOrderDetails(this.order);
    this.guestDetailsSubmitted.emit(this.order);
  }
}
