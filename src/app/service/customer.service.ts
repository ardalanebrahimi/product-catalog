// src/app/services/auth.service.ts
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
export class CustomerService {
  private apiUrl = environment.apiUrl + 'customer';

  constructor(private http: HttpClient) {}

  registerCustomer(data: RegisterCustomerRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  login(data: LoginRequest): Observable<{ accessToken: string }> {
    return this.http.post<{ accessToken: string }>(
      `${this.apiUrl}/login`,
      data
    );
  }
}
