import { RouterModule, Routes } from '@angular/router';
import { ProductViewComponent } from './components/product-view/product-view.component';
import { CartComponent } from './components/cart/cart.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { PaymentComponent } from './components/payment/payment.component';
import { OrderConfirmationComponent } from './components/order-confirmation/order-confirmation.component';
import { LandingPageComponent } from './components/landing-page.component/landing-page.component';

export const routes: Routes = [
  { path: 'home', component: LandingPageComponent },
  { path: 'products/:id', component: ProductViewComponent },
  { path: 'cart', component: CartComponent },
  { path: 'order-details', component: OrderDetailsComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'order-confirmation', component: OrderConfirmationComponent },
];
