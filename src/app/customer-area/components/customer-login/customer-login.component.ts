// customer-login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerAuthService } from '../../services/customer-auth.service';

@Component({
  selector: 'app-customer-login',
  templateUrl: './customer-login.component.html',
  styleUrls: ['./customer-login.component.scss'],
})
export class CustomerLoginComponent {
  email = '';
  password = '';
  error?: string;

  constructor(
    private authService: CustomerAuthService,
    private router: Router
  ) {}

  login() {
    this.authService
      .login({ email: this.email, password: this.password })
      .subscribe({
        next: (response) => {
          this.authService.saveToken(response.accessToken);
          this.router.navigate(['/shop']); // Redirect to the shop homepage
        },
        error: (err) => {
          (this.error = 'Login failed:'), err;
        },
      });
  }
}
