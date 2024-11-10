import { Component, Input } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { Product } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss'],
})
export class OrderSummaryComponent {
  products: Product[] = [];

  constructor(public cartService: CartService) {}

  ngOnInit() {
    this.products = this.cartService.getCartProducts();
  }

  calculateTotalAmount(): number {
    return this.cartService.calculateTotalPrice();
  }
}
