// src/app/services/order-detail.service.ts
import { Injectable } from '@angular/core';
import { CustomerAuthService } from '../../services/customer-auth.service';

@Injectable({
  providedIn: 'root',
})
export class OrderDetailService {
  showRegistrationForm = false;
  registerData = {
    name: '',
    email: '',
    address: '',
    phone: '', // Optional
    password: '',
  };
  registrationMessage: string | null = null;
  isRegistrationSuccess = false;
  private isLoggedIn = false;
  private isGuest = false;
  private order = {
    name: '',
    email: '',
    address: '',
    phone: '',
    notes: '',
  };

  constructor(public customerAuthService: CustomerAuthService) {}

  setLoggedIn(status: boolean) {
    this.isLoggedIn = status;
  }

  setGuest(status: boolean) {
    this.isGuest = status;
  }

  getOrderDetails() {
    return this.order;
  }

  setOrderDetails(details: any) {
    this.order = { ...this.order, ...details };
  }

  getIsLoggedIn() {
    return this.isLoggedIn;
  }

  getIsGuest() {
    return this.isGuest;
  }

  // Register a new customer
  registerCustomer() {
    this.customerAuthService.registerCustomer(this.registerData).subscribe({
      next: () => {
        this.registrationMessage = 'Registration successful';
        this.isRegistrationSuccess = true;
        this.showRegistrationForm = false;
      },
      error: (error) => {
        this.registrationMessage = error.error || 'Registration failed';
        this.isRegistrationSuccess = false;
      },
    });
  }

  // Switch to login form
  showLoginForm(): void {
    this.showRegistrationForm = false;
    this.isGuest = false;
    this.isLoggedIn = false;
  }

  // Switch to login form
  showRegisterForm(): void {
    this.showRegistrationForm = true;
    this.isGuest = false;
  }
}
