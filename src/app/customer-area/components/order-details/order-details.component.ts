import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent {
  isLoggedIn = false; // Simulate login state
  isGuest = false; // Track if user is continuing as guest
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

  order = {
    name: '',
    email: '',
    address: '',
    phone: '',
    notes: '',
  };

  constructor(
    private router: Router,
    public customerService: CustomerService
  ) {}

  // Simulate registration method
  register(): void {
    this.showRegistrationForm = true;
  }

  // Continue as guest
  continueAsGuest(): void {
    this.isGuest = true;
    this.isLoggedIn = false;
  }

  handleLoginSuccess(userData: any): void {
    this.isLoggedIn = true;
    this.isGuest = false;
    this.order = { ...userData };
  }

  submitOrderDetails(): void {
    console.log('Order details submitted:', this.order);
    this.router.navigate(['/payment']);
  }
  // Register a new customer
  registerCustomer() {
    this.customerService.registerCustomer(this.registerData).subscribe({
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
}
