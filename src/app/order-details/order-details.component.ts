// order-details.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent {
  order = {
    name: '',
    email: '',
    address: '',
    phone: '',
    notes: '',
  };

  constructor(private router: Router) {}

  submitOrderDetails(): void {
    // Save order details or pass them to the payment component if necessary
    console.log('Order details submitted:', this.order);

    // Navigate to the payment page
    this.router.navigate(['/payment']);
  }
}
