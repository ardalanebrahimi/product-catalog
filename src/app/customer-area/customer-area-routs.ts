// customer-area-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductViewComponent } from './components/product-view/product-view.component';
import { CartComponent } from './components/cart/cart.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { PaymentComponent } from './components/payment/payment.component';
import { OrderConfirmationComponent } from './components/order-confirmation/order-confirmation.component';
import { LandingPageComponent } from './components/landing-page.component/landing-page.component';
import { CustomerAuthGuard } from './guards/customer-auth.guard';
import { GuestAuthGuard } from './guards/guest-auth.guard';
import { CustomerLoginComponent } from './components/customer-login/customer-login.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'products/:id', component: ProductViewComponent },
  { path: 'cart', component: CartComponent },
  { path: 'order-details', component: OrderDetailsComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'order-confirmation', component: OrderConfirmationComponent },
  {
    path: 'login',
    component: CustomerLoginComponent,
    canActivate: [GuestAuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerAreaRoutingModule {}
