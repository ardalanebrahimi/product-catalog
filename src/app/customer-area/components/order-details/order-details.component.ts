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
  }

  handleGuestContinue() {
    this.orderDetailService.setGuest(true);
  }

  handleRegistrationSuccess() {
    this.orderDetailService.setLoggedIn(true);
  }

  submitOrderDetails() {
    console.log(
      'Order details submitted:',
      this.orderDetailService.getOrderDetails()
    );
    this.router.navigate(['/payment']);
  }
}
