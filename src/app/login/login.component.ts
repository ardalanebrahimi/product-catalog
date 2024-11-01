// login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  error: string | null = null;

  constructor(private service: UserService, private router: Router) {}

  login() {
    this.service.login(this.username, this.password).subscribe(
      (response) => {
        sessionStorage.setItem('accessToken', response.accessToken);
        this.router.navigate(['/home']);
      },
      (error) => {
        this.error = 'Login failed. Please check your username and password.';
      }
    );
  }
}
