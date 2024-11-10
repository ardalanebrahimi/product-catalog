// guest-auth.guard.ts
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { CustomerAuthService } from '../services/customer-auth.service';

@Injectable({
  providedIn: 'root',
})
export class GuestAuthGuard implements CanActivate {
  constructor(
    private customerAuthService: CustomerAuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.customerAuthService.isCustomerLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/shop']); // Redirect to shop home if logged in
      return false;
    }
  }
}
