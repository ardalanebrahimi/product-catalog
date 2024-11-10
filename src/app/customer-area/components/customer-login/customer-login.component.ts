import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerAuthService } from '../../services/customer-auth.service';

@Component({
  selector: 'app-customer-login',
  templateUrl: './customer-login.component.html',
  styleUrls: ['./customer-login.component.scss'],
})
export class CustomerLoginComponent {
  email: string = '';
  password: string = '';
  error: string | null = null;

  constructor(
    private customerAuthService: CustomerAuthService,
    private router: Router
  ) {}

  login() {
    this.customerAuthService
      .login({ email: this.email, password: this.password })
      .subscribe(
        (response) => {
          sessionStorage.setItem('accessToken', response.accessToken);
          this.router.navigate(['/home']);
        },
        (error) => {
          this.error = 'Login failed. Please check your email and password.';
        }
      );
  }
}
