import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../service/product.service';
import { Product } from '../model/product.model';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss'],
})
export class ProductViewComponent implements OnInit {
  product: Product = {
    id: '',
    name: '',
    description: '',
    price: undefined,
    images: [],
  };

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const productId = params['id'];
      this.productService.getProductById(productId).subscribe(
        (product) => {
          this.product = product;
        },
        (error) => {
          console.error('Error fetching product:', error);
        }
      );
    });
  }

  addToCart(product: Product): void {
    this.cartService.addProductToCart(product);
    alert(`${product.name} added to your cart!`);
  }
}
