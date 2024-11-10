// customer-auth.guard.ts
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { CustomerAuthService } from '../services/customer-auth.service';

@Injectable({
  providedIn: 'root',
})
export class CustomerAuthGuard implements CanActivate {
  constructor(
    private customerAuthService: CustomerAuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.customerAuthService.isCustomerLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/shop/login']); // Redirect to customer login if not authenticated
      return false;
    }
  }
}
