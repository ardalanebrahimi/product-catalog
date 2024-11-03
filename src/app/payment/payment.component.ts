import { Component, OnInit } from '@angular/core';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  private stripe: Stripe | null = null;
  clientSecret: string = '';
  selectedPaymentMethod: 'credit' | 'paypal' | 'klarna' = 'credit'; // Selected payment method

  constructor(
    private http: HttpClient,
    private router: Router,
    public cartService: CartService
  ) {}

  async ngOnInit() {
    this.stripe = await loadStripe(environment.stripePublicKey);
    if (this.selectedPaymentMethod === 'credit') {
      this.createPaymentIntent(); // Only create payment intent for credit card
    }
  }

  createPaymentIntent(): void {
    const amount = this.calculateTotalAmount(); // Calculate total amount in cents
    this.http
      .post<{ clientSecret: string }>(
        `${environment.apiUrl}payment/create-payment-intent`,
        { amount }
      )
      .subscribe((response) => {
        this.clientSecret = response.clientSecret;
        this.mountStripeElements();
      });
  }

  calculateTotalAmount(): number {
    return 1000; // Example amount in cents
  }

  mountStripeElements() {
    if (!this.stripe || !this.clientSecret) return;

    const elements = this.stripe.elements();
    const cardElement = elements.create('card', { hidePostalCode: true });
    cardElement.mount('#card-element');

    document
      .querySelector('button#pay-button')
      ?.addEventListener('click', async () => {
        const { paymentIntent, error } = await this.stripe!.confirmCardPayment(
          this.clientSecret,
          {
            payment_method: {
              card: cardElement,
            },
          }
        );

        if (error) {
          console.error('Payment failed:', error);
        } else if (paymentIntent) {
          this.handleSuccessfulPayment();
        }
      });
  }

  private handleSuccessfulPayment() {
    this.cartService.clearCart();
    console.log('Payment successful:');
    this.router.navigate(['/order-confirmation']);
  }

  // Placeholder for PayPal payment handling
  handlePayPalPayment() {
    this.handleSuccessfulPayment();
  }

  // Placeholder for Klarna payment handling
  handleKlarnaPayment() {
    this.handleSuccessfulPayment();
  }
}
