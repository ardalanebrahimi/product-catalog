import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/shared/models/product.model';
import { ProductService } from 'src/app/shared/services/product.service';

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
