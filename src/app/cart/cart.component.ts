import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product.model';
import { CartService } from '../service/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartItems: Product[] = [];

  constructor(public cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
  }

  removeFromCart(index: number): void {
    this.cartItems.splice(index, 1); // Remove from local array
    this.cartService.updateCart(this.cartItems); // Update service and save to localStorage
  }

  finalizeOrder(): void {
    this.router.navigate(['/order-details']);
  }
}
