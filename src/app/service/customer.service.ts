// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

interface RegisterCustomerRequest {
  username: string;
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
}
