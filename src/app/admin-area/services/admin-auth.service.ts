// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthService {
  private apiUrl = environment.apiUrl + 'user';

  constructor(private http: HttpClient) {}

  // Admin login and store access token
  login(username: string, password: string) {
    return this.http.post<{ accessToken: string }>(`${this.apiUrl}/login`, {
      username: username,
      password: password,
    });
  }

  // Save admin access token
  saveToken(token: string): void {
    sessionStorage.setItem('adminAccessToken', token);
  }

  // Check if an admin is logged in
  isAdmin = (): boolean => sessionStorage.getItem('adminAccessToken') !== null;

  // Logout and clear session
  logout(): void {
    sessionStorage.removeItem('adminAccessToken');
  }
}
