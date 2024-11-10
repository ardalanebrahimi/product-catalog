// login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminAuthService } from '../../services/admin-auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss'],
})
export class AdminLoginComponent {
  username: string = '';
  password: string = '';
  error: string | null = null;

  constructor(private service: AdminAuthService, private router: Router) {}

  login() {
    this.service.login(this.username, this.password).subscribe(
      (response) => {
        this.service.saveToken(response.accessToken);
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        this.error = 'Login failed. Please check your username and password.';
      }
    );
  }
}
