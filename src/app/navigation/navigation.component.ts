import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  /**
   *
   */
  constructor(public userService: UserService) {}

  logout() {
    this.userService.logout();
    // this.router.navigate(['/home']);
  }
}
