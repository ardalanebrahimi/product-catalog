import { Injectable } from '@angular/core';
import { Product } from 'src/app/shared/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: Product[] = [];

  constructor() {
    this.loadCart();
  }

  private saveCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  private loadCart(): void {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cart = JSON.parse(savedCart);
    }
  }

  addProductToCart(product: Product): void {
    this.cart.push(product);
    this.saveCart();
  }

  getCartItems(): Product[] {
    return this.cart;
  }

  getItemCount(): number {
    return this.cart.length;
  }

  updateCart(cart: Product[]): void {
    this.cart = cart;
    this.saveCart();
  }

  clearCart(): void {
    this.cart = [];
    localStorage.removeItem('cart');
  }

  // New methods
  getCartProducts(): Product[] {
    return this.cart;
  }

  calculateTotalPrice(): number {
    return this.cart.reduce(
      (total, product) => total + (product.price || 0),
      0
    );
  }
}
