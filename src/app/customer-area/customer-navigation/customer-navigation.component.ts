import { Component } from '@angular/core';
import { CartService } from '../../customer-area/services/cart.service';

@Component({
  selector: 'app-customer-navigation',
  templateUrl: './customer-navigation.component.html',
  styleUrls: ['./customer-navigation.component.scss'],
})
export class CustomerNavigationComponent {
  constructor(
    public cartService: CartService // Inject CartService
  ) {}
}
