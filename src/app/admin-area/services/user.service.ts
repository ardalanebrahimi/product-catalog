// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.apiUrl + 'user';

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post<{ accessToken: string }>(`${this.apiUrl}/login`, {
      username: username,
      password: password,
    });
  }

  logout() {
    sessionStorage.removeItem('accessToken');
  }

  isAdmin = () =>
    sessionStorage.getItem('accessToken') &&
    sessionStorage.getItem('accessToken') !== 'undefined';
}
