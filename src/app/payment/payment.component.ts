import { Component, OnInit, NgZone } from '@angular/core';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { CartService } from '../service/cart.service';
import { NotificationService } from '../service/notification.service';

declare var paypal: any; // Declare PayPal from SDK

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  private stripe: Stripe | null = null;
  clientSecret: string = '';
  selectedPaymentMethod: 'credit' | 'paypal' | 'klarna' = 'credit';

  constructor(
    private http: HttpClient,
    private router: Router,
    public cartService: CartService,
    private zone: NgZone,
    public notificationService: NotificationService
  ) {}

  async ngOnInit() {
    // Load payment option based on the selected method
    if (this.selectedPaymentMethod === 'credit') {
      this.loadStripePublicKey();
    } else if (this.selectedPaymentMethod === 'paypal') {
      this.loadPayPalClientId();
    }
  }

  // Handle changes in the payment method
  onPaymentMethodChange(paymentMethod: 'credit' | 'paypal' | 'klarna') {
    this.selectedPaymentMethod = paymentMethod;
    if (paymentMethod === 'credit') {
      this.loadStripePublicKey();
    } else if (paymentMethod === 'paypal') {
      this.loadPayPalClientId();
    } else if (paymentMethod === 'klarna') {
      console.log('Klarna selected');
      // Implement Klarna initialization if needed
    }
  }

  // Load Stripe public key from backend and initialize Stripe
  private loadStripePublicKey() {
    this.http
      .get<{ publicKey: string }>(
        `${environment.apiUrl}config/stripe-public-key`
      )
      .toPromise()
      .then((response) => {
        if (response) this.initializeStripe(response.publicKey);
        else throw 'not found';
      })
      .catch((error) =>
        console.error('Error fetching Stripe Public Key:', error)
      );
  }

  private async initializeStripe(publicKey: string) {
    if (!this.stripe) {
      this.stripe = await loadStripe(publicKey);
    }
    this.createPaymentIntent();
  }

  createPaymentIntent(): void {
    const amount = this.calculateTotalAmount();
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
    this.notificationService.showNotification('Payment successful');
    this.router.navigate(['/order-confirmation']);
  }

  private loadPayPalClientId() {
    this.http
      .get<{ clientId: string }>(`${environment.apiUrl}config/paypal-client-id`)
      .toPromise()
      .then((response) => {
        this.loadPayPalScript(response?.clientId);
      })
      .catch((error) =>
        console.error('Error fetching PayPal Client ID:', error)
      );
  }

  private loadPayPalScript(clientId?: string) {
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=EUR`;
    script.onload = () => this.loadPayPalButton();
    document.body.appendChild(script);
  }

  loadPayPalButton() {
    this.zone.runOutsideAngular(() => {
      setTimeout(() => {
        paypal
          .Buttons({
            createOrder: () => {
              const amount = this.calculateTotalAmount();
              return this.http
                .post<{ orderId: string }>(
                  `${environment.apiUrl}payment/create-paypal-order`,
                  { amount: amount },
                  { headers: { 'Content-Type': 'application/json' } }
                )
                .toPromise()
                .then((response) => response?.orderId);
            },
            onApprove: (data: any) => {
              return this.http
                .post(`${environment.apiUrl}payment/capture-paypal-order`, {
                  orderId: data.orderID,
                })
                .toPromise()
                .then(() => {
                  this.handleSuccessfulPayment();
                })
                .catch((error) => {
                  console.error('PayPal payment capture failed:', error);
                });
            },
            onError: (err: any) => {
              console.error('PayPal error:', err);
            },
          })
          .render('#paypal-button-container');
      }, 0);
    });
  }

  handleKlarnaPayment() {
    // Implement Klarna payment processing if needed
    this.handleSuccessfulPayment();
  }
}
