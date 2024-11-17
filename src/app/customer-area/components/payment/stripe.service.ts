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

  async handleCreditPayment() {
    await this.createPaymentIntent()?.subscribe(() => {
      const cardElement = this.mountCardElement();
      document
        .querySelector('button#pay-button')
        ?.addEventListener('click', async () => {
          const { paymentIntent, error } = await this.confirmCardPayment(
            cardElement,
            this.customer
          );

          if (error) {
            console.error('Payment failed:', error);
          } else if (paymentIntent) {
            this.handleSuccessfulPayment();
          }
        });
    });
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
      .pipe(
        map((response) => {
          this.clientSecret = response.clientSecret;
          return response.clientSecret;
        })
      );
  }

  mountCardElement(): any {
    if (!this.stripe || !this.clientSecret) return;

    const elements = this.stripe.elements();
    const cardElement = elements.create('card', { hidePostalCode: true });
    cardElement.mount('#card-element');

    return cardElement;
  }

  async confirmCardPayment(cardElement: any, billingDetails: any) {
    const { paymentIntent, error } = await this.stripe!.confirmCardPayment(
      this.clientSecret,
      {
        payment_method: {
          card: cardElement,
          billing_details: billingDetails,
        },
      }
    );
    return { paymentIntent, error };
  }

  private handleSuccessfulPayment() {
    this.cartService.clearCart();
    this.notificationService.showNotification('Payment successful');
    this.router.navigate(['/order-confirmation']);
  }
}
