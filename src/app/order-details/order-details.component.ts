// order-details.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../service/customer.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent {
  isLoggedIn = false; // Simulate login state
  isGuest = false; // Track if user is continuing as guest
  showRegistrationForm = false;
  registerData = { username: '', email: '', password: '' };
  registrationMessage: string | null = null;

  // User data to simulate a logged-in user preview
  userData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    address: '123 Sample St, City, Country',
    phone: '1234567890',
  };

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

  // Simulate login method
  login(): void {
    this.isLoggedIn = true;
    this.isGuest = false;
    // Load user data into the order form if needed
    Object.assign(this.order, this.userData);
  }

  // Simulate registration method
  register(): void {
    this.showRegistrationForm = true;
  }

  // Continue as guest
  continueAsGuest(): void {
    this.isGuest = true;
    this.isLoggedIn = false;
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
        this.showRegistrationForm = false;
      },
      error: (error) => {
        this.registrationMessage = error.error || 'Registration failed';
      },
    });
  }
}
