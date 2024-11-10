import { Component, OnInit } from '@angular/core';
import { AdminProductService } from 'src/app/admin-area/services/admin-product.service';
import { Order, OrderService } from '../../services/order.service';
import { Product } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
  totalProducts: number = 0;
  totalOrders: number = 0;
  pendingOrders: number = 0;

  isLoadingProducts: boolean = false;
  isLoadingOrders: boolean = false;
  errorMessage: string = '';

  constructor(
    private productService: AdminProductService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.loadProducts();
    this.loadOrders();
  }

  loadProducts(): void {
    this.isLoadingProducts = true;
    this.productService.getProducts().subscribe(
      (products: Product[]) => {
        this.totalProducts = products.length;
        this.isLoadingProducts = false;
      },
      (error) => {
        this.errorMessage = 'Failed to load product data.';
        this.isLoadingProducts = false;
      }
    );
  }

  loadOrders(): void {
    this.isLoadingOrders = true;
    this.orderService.getOrders().subscribe(
      (orders: Order[]) => {
        this.totalOrders = orders.length;
        this.pendingOrders = orders.filter(
          (order) => order.status === 'pending'
        ).length;
        this.isLoadingOrders = false;
      },
      (error) => {
        this.errorMessage = 'Failed to load order data.';
        this.isLoadingOrders = false;
      }
    );
  }
}
