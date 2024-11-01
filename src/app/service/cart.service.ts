import { Injectable } from '@angular/core';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: Product[] = [];

  addProductToCart(product: Product): void {
    this.cart.push(product);
  }

  getCartItems(): Product[] {
    return this.cart;
  }

  getItemCount(): number {
    return this.cart.length;
  }
}
