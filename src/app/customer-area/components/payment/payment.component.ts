import { Component, OnInit, NgZone } from '@angular/core';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { CartService } from '../../services/cart.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { OrderDetailService } from '../order-details/order-detail.service';

declare var paypal: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  private stripe: Stripe | null = null;
  clientSecret: string = '';
  selectedPaymentMethod: 'credit' | 'paypal' | 'klarna' = 'credit';
  customer: any = {}; // Customer info from OrderDetailService

  constructor(
    private http: HttpClient,
    private router: Router,
    public cartService: CartService,
    private zone: NgZone,
    public notificationService: NotificationService,
    private orderDetailService: OrderDetailService // Injecting OrderDetailService
  ) {}

  async ngOnInit() {
    this.loadCustomerData();
    this.loadPaymentMethod();
  }

  loadCustomerData() {
    // Get customer data from OrderDetailService (either from logged-in or guest state)
    this.customer = this.orderDetailService.getCustomer();
  }

  loadPaymentMethod() {
    if (this.selectedPaymentMethod === 'credit') {
      this.loadStripePublicKey();
    } else if (this.selectedPaymentMethod === 'paypal') {
      this.loadPayPalClientId();
    }
  }

  onPaymentMethodChange(paymentMethod: 'credit' | 'paypal' | 'klarna') {
    this.selectedPaymentMethod = paymentMethod;
    this.loadPaymentMethod();
  }

  // Payment Methods Initialization (Credit Card, PayPal, Klarna)
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
    const amount = this.cartService.calculateTotalPrice(); // Use actual total from cart
    this.http
      .post<{ clientSecret: string }>(
        `${environment.apiUrl}payment/create-payment-intent`,
        { amount, customer: this.customer }
      )
      .subscribe((response) => {
        this.clientSecret = response.clientSecret;
        this.mountStripeElements();
      });
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
              billing_details: this.customer,
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
              // Calculate and round the amount to two decimal places
              const amount = parseFloat(
                this.cartService.calculateTotalPrice().toFixed(2)
              );
              return this.http
                .post<{ orderId: string }>(
                  `${environment.apiUrl}payment/create-paypal-order`,
                  { amount },
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
