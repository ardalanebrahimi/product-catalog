// src/app/components/order-details/order-details.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrderDetailService } from './order-detail.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent {
  constructor(
    private router: Router,
    public orderDetailService: OrderDetailService
  ) {}

  handleLoginSuccess() {
    this.orderDetailService.setLoggedIn(true);
    this.orderDetailService.setCustomer(
      this.orderDetailService.getOrderDetails()
    );
  }

  handleGuestContinue() {
    this.orderDetailService.setGuest(true);
    this.orderDetailService.setCustomer(
      this.orderDetailService.getOrderDetails()
    );
  }

  handleRegistrationSuccess() {
    this.orderDetailService.setLoggedIn(true);
    this.orderDetailService.setCustomer(
      this.orderDetailService.getOrderDetails()
    );
  }

  submitOrderDetails() {
    console.log(
      'Order details submitted:',
      this.orderDetailService.getCustomer()
    );
    this.router.navigate(['/payment']);
  }
}
