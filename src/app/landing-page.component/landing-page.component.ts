import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { Product } from '../model/product.model';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent {
  products?: Product[];
  constructor(private productService: ProductService) {
    this.loadProducts();
  }

  private loadProducts() {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }
}
