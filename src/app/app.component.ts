import { Component, OnInit } from '@angular/core';
import { UserService } from './admin-area/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public userService: UserService) {}

  isAdmin() {
    return this.userService.isAdmin() === true;
  }
}
