import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  protected apiUrl = environment.apiUrl + 'products';

  constructor(protected http: HttpClient) {}

  // Fetch all products
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  // Fetch product by ID
  getProductById(productId: string): Observable<Product> {
    const url = `${this.apiUrl}/${productId}`;
    return this.http.get<Product>(url);
  }
}
