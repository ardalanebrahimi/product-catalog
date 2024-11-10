// src/app/services/customer-auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

interface RegisterCustomerRequest {
  name: string;
  email: string;
  address: string;
  phone?: string; // Optional field
  password: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class CustomerAuthService {
  private apiUrl = environment.apiUrl + 'customer';

  constructor(private http: HttpClient) {}

  // Register a new customer
  registerCustomer(data: RegisterCustomerRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  // Customer login and store access token
  login(data: LoginRequest): Observable<{ accessToken: string }> {
    return this.http.post<{ accessToken: string }>(
      `${this.apiUrl}/login`,
      data
    );
  }

  // Save customer access token
  saveToken(token: string): void {
    sessionStorage.setItem('customerAccessToken', token);
  }

  // Check if the customer is logged in
  isCustomerLoggedIn = (): boolean =>
    sessionStorage.getItem('customerAccessToken') !== null;

  // Logout and clear session
  logout(): void {
    sessionStorage.removeItem('customerAccessToken');
  }
}
