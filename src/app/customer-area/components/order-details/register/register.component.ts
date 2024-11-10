// src/app/components/register/register.component.ts
import { Component, Output, EventEmitter } from '@angular/core';
import { OrderDetailService } from '../order-detail.service';
import { CustomerAuthService } from 'src/app/customer-area/services/customer-auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  @Output() registrationSuccess = new EventEmitter<void>();

  registerData = {
    name: '',
    email: '',
    address: '',
    phone: '',
    password: '',
  };

  registrationMessage: string | null = null;

  constructor(
    public orderDetailService: OrderDetailService,
    private customerAuthService: CustomerAuthService
  ) {}

  registerCustomer() {
    this.customerAuthService.registerCustomer(this.registerData).subscribe({
      next: () => {
        this.registrationMessage = 'Registration successful';
        this.orderDetailService.setLoggedIn(true);
        this.orderDetailService.setOrderDetails(this.registerData);
        this.registrationSuccess.emit();
      },
      error: (error) => {
        this.registrationMessage = error.error || 'Registration failed';
      },
    });
  }
}
