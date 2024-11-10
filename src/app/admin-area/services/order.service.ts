import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Order {
  id: string;
  status: 'pending' | 'completed' | 'cancelled';
  customerName: string;
  totalAmount: number;
}

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private orders: Order[] = [
    { id: '1', status: 'pending', customerName: 'Alice', totalAmount: 100 },
    { id: '2', status: 'completed', customerName: 'Bob', totalAmount: 200 },
    { id: '3', status: 'pending', customerName: 'Charlie', totalAmount: 300 },
  ];

  constructor() {}

  getOrders(): Observable<Order[]> {
    return of(this.orders);
  }
}
