import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { environment } from 'environments/environment';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StripeService {
  private stripe: Stripe | null = null;
  clientSecret: string = '';
  amount = 0;
  customer: any;

  constructor(
    private http: HttpClient,
    public notificationService: NotificationService,
    private router: Router,
    public cartService: CartService
  ) {}

  initializeStripe(amount: number, customer: any) {
    this.amount = amount;
    this.customer = customer;
    if (this.stripe) this.handleCreditPayment();
    else {
      this.http
        .get<{ publicKey: string }>(
          `${environment.apiUrl}config/stripe-public-key`
        )
        .subscribe(async (response) => {
          this.stripe = await loadStripe(response.publicKey);
          this.handleCreditPayment();
        });
    }
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

  async handleCreditPayment() {
    await this.createPaymentIntent();
  }

  createPaymentIntent() {
    if (this.amount < 0.5) {
      this.notificationService.showNotification(
        'The amount must be at least 50 cents to proceed with payment.'
      );
      return;
    }

    // Convert amount to cents as required by Stripe (e.g., 1 dollar = 100 cents)
    this.amount = Math.round(this.amount * 100);

    return this.http
      .post<{ clientSecret: string }>(
        `${environment.apiUrl}payment/create-payment-intent`,
        { amount: this.amount, customer: this.customer }
      )
      .subscribe((response) => {
        this.clientSecret = response.clientSecret;
        this.mountStripeElements();
      });
  }

  private handleSuccessfulPayment() {
    this.cartService.clearCart();
    this.notificationService.showNotification('Payment successful');
    this.router.navigate(['/order-confirmation']);
  }
}
