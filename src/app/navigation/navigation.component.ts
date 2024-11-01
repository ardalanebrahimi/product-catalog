import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { CartService } from '../service/cart.service'; // Import your CartService

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  constructor(
    public userService: UserService,
    public cartService: CartService // Inject CartService
  ) {}

  logout() {
    this.userService.logout();
    // this.router.navigate(['/home']);
  }
}
