import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { Product } from '../model/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent {
  products?: Product[];
  constructor(private productService: ProductService, public router: Router) {
    this.loadProducts();
  }

  private loadProducts() {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }

  public viewProduct(productId?: string) {
    if (productId) this.router.navigate(['/products', productId]);
  }
}
