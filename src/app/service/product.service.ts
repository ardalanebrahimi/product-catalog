import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../model/product.model';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }  
  
  getProductById(productId: string): Observable<Product> {
    const url = `${this.apiUrl}/${productId}`;
    return this.http.get<Product>(url);
  }

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
      product.imageFiles.forEach(imageFile => {
        formData.append('imageFiles', imageFile, imageFile.name);        
      });
    }

    // Send the FormData with the image to the backend using HttpClient
    return this.http.post(this.apiUrl, formData);
  }

  deleteProduct(product: Product): Observable<void>  {
    const url = `${this.apiUrl}/${product.id}`;
    return this.http.delete<void>(url);
  }  
  
  updateProductWithImage(productId: string, updatedProduct: Product): Observable<Product> {
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
      updatedProduct.imageFiles.forEach(imageFile => {
        formData.append('imageFiles', imageFile, imageFile.name);        
      });
    }
  
    return this.http.put<Product>(url, formData);
  } 
  
  deleteImage(productId: string, imageUrl: string): Observable<void> {  
    const url = `${this.apiUrl}/${productId}/images?imageUrl=${encodeURIComponent(imageUrl)}`;

  return this.http.delete<void>(url);
    // const url = `${this.apiUrl}/${productId}/images`;
    // const httpOptions = {
    //   headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    //   body: {imageUrl} 
    // };

    // return this.http.delete<void>(url, httpOptions);
  }
}
