import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../shared/models/product.model';
import { ProductService } from '../../shared/services/product.service';

@Injectable({
  providedIn: 'root',
})
export class AdminProductService extends ProductService {
  constructor(protected override http: HttpClient) {
    super(http);
  }

  // Create a product with an image
  createProductWithImage(product: Product): Observable<any> {
    const formData = new FormData();

    if (product.name) {
      formData.append('name', product.name);
    }
    if (product.description) {
      formData.append('description', product.description);
    }
    if (product.price) {
      formData.append('price', String(product.price));
    }
    if (product.imageFiles) {
      product.imageFiles.forEach((imageFile) => {
        formData.append('imageFiles', imageFile, imageFile.name);
      });
    }

    return this.http.post(this.apiUrl, formData);
  }

  // Update a product with an image
  updateProductWithImage(
    productId: string,
    updatedProduct: Product
  ): Observable<Product> {
    const url = `${this.apiUrl}/${productId}`;
    const formData = new FormData();

    if (updatedProduct.name) {
      formData.append('name', updatedProduct.name);
    }
    if (updatedProduct.description) {
      formData.append('description', updatedProduct.description);
    }
    if (updatedProduct.price) {
      formData.append('price', String(updatedProduct.price));
    }
    if (updatedProduct.imageFiles) {
      updatedProduct.imageFiles.forEach((imageFile) => {
        formData.append('imageFiles', imageFile, imageFile.name);
      });
    }

    return this.http.put<Product>(url, formData);
  }

  // Delete a product
  deleteProduct(product: Product): Observable<void> {
    const url = `${this.apiUrl}/${product.id}`;
    return this.http.delete<void>(url);
  }

  // Delete an image from a product
  deleteImage(productId: string, imageUrl: string): Observable<void> {
    const url = `${
      this.apiUrl
    }/${productId}/images?imageUrl=${encodeURIComponent(imageUrl)}`;
    return this.http.delete<void>(url);
  }
}
