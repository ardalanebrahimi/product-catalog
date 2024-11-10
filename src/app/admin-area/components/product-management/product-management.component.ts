import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/shared/models/product.model';
import { ProductService } from 'src/app/shared/services/product.service';
import { AdminProductService } from '../../services/admin-product.service';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.scss'],
})
export class ProductManagementComponent implements OnInit {
  products: Product[] = [];
  editingProduct: Product | null = null;

  constructor(
    private productService: AdminProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  private loadProducts() {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }

  editProduct(product: Product) {
    this.router.navigate(['/edit', product.id]);
  }

  deleteProduct(product: Product) {
    this.productService.deleteProduct(product).subscribe(() => {
      // Remove the deleted product from the frontend product list
      this.products = this.products.filter((p) => p.id !== product.id);
    });
  }

  createNewProduct() {
    this.router.navigate(['/admin/create']);
  }
}
