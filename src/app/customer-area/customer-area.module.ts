import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routes } from './customer-area-routs';
import { ProductViewComponent } from './components/product-view/product-view.component';
import { CartComponent } from './components/cart/cart.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { PaymentComponent } from './components/payment/payment.component';
import { OrderConfirmationComponent } from './components/order-confirmation/order-confirmation.component';
import { FormsModule } from '@angular/forms';
import { LandingPageComponent } from './components/landing-page.component/landing-page.component';
import { CustomerNavigationComponent } from './customer-navigation/customer-navigation.component';
import { CustomerLoginComponent } from './components/customer-login/customer-login.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    LandingPageComponent,
    ProductViewComponent,
    CartComponent,
    OrderDetailsComponent,
    PaymentComponent,
    OrderConfirmationComponent,
    CustomerNavigationComponent,
    CustomerLoginComponent,
    // Any other customer components
  ],
  imports: [CommonModule, RouterModule.forChild(routes), FormsModule],
  exports: [CustomerNavigationComponent],
})
export class CustomerAreaModule {}
