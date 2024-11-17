import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { OrderDetailService } from '../order-details/order-detail.service';
import { StripeService } from './stripe.service';
import { PayPalService } from './paypal.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  selectedPaymentMethod: 'credit' | 'paypal' | 'klarna' = 'credit';
  customer: any = {}; // Customer info from OrderDetailService

  constructor(
    private router: Router,
    public cartService: CartService,
    public notificationService: NotificationService,
    private orderDetailService: OrderDetailService,
    private stripeService: StripeService,
    private paypalService: PayPalService
  ) {}

  async ngOnInit() {
    this.loadCustomerData();
    this.loadPaymentMethod();
  }

  loadCustomerData() {
    this.customer = this.orderDetailService.getCustomer();
  }

  loadPaymentMethod() {
    if (this.selectedPaymentMethod === 'credit') {
      this.stripeService.initializeStripe(
        this.cartService.calculateTotalPrice(),
        this.customer
      );
    } else if (this.selectedPaymentMethod === 'paypal') {
      this.paypalService.loadPayPalScript(
        this.cartService.calculateTotalPrice()
      );
    }
  }

  onPaymentMethodChange(paymentMethod: 'credit' | 'paypal' | 'klarna') {
    this.selectedPaymentMethod = paymentMethod;
    this.loadPaymentMethod();
  }
}
