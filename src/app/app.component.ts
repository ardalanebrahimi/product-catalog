import { Component, OnInit } from '@angular/core';
import { AdminAuthService } from './admin-area/services/admin-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public service: AdminAuthService) {}

  isAdmin() {
    return this.service.isAdmin() === true;
  }
}
