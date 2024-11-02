// payment.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent {
  constructor(private router: Router, public cartService: CartService) {}

  finalizeOrder(): void {
    // Here you would normally handle the payment process
    console.log('Payment successful, order finalized.');

    // Navigate to the order confirmation page
    this.router.navigate(['/order-confirmation']);
    this.cartService.clearCart(); // Clear cart after finalizing order
  }
}
