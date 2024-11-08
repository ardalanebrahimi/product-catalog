import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../service/product.service';
import { Product } from '../model/product.model';
import { CartService } from '../service/cart.service';
import { NotificationService } from '../service/notification.service';

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
  addedToCart?: boolean;

  constructor(
    private productService: ProductService,
    public cartService: CartService,
    private route: ActivatedRoute,
    private notificationService: NotificationService
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
    this.notificationService.showNotification(
      `${product.name} added to your cart!`
    );
    this.addedToCart = true;
  }
}
