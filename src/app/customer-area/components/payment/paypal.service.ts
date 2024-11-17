import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

declare var paypal: any;

@Injectable({
  providedIn: 'root',
})
export class PayPalService {
  constructor(private http: HttpClient, private zone: NgZone) {}

  async loadPayPalScript(amount: number) {
    this.http
      .get<{ clientId: string }>(`${environment.apiUrl}config/paypal-client-id`)
      .toPromise()
      .then((response) => {
        const script = document.createElement('script');
        script.src = `https://www.paypal.com/sdk/js?client-id=${response?.clientId}&currency=EUR`;
        script.onload = () => this.loadPayPalButton(amount);
        document.body.appendChild(script);
      })
      .catch((error) =>
        console.error('Error fetching PayPal Client ID:', error)
      );
  }

  createOrder(amount: number) {
    return this.http
      .post<{ orderId: string }>(
        `${environment.apiUrl}payment/create-paypal-order`,
        { amount },
        { headers: { 'Content-Type': 'application/json' } }
      )
      .subscribe((response) => response?.orderId);
  }

  loadPayPalButton(amount: number) {
    this.zone.runOutsideAngular(() => {
      setTimeout(() => {
        paypal
          .Buttons({
            createOrder: () => this.createOrder(amount),
            onApprove: (data: any) => {
              return this.http
                .post(`${environment.apiUrl}payment/capture-paypal-order`, {
                  orderId: data.orderID,
                })
                .toPromise()
                .then(() => {
                  // Handle successful payment
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
}
