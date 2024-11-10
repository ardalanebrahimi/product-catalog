import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductCreateComponent } from './components/product-create/product-create.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminNavigationComponent } from './components/admin-navigation/admin-navigation.component';
import { ProductManagementComponent } from './components/product-management/product-management.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { RouterModule } from '@angular/router';
import { routes } from './admin-area-routes';

@NgModule({
  declarations: [
    ProductCreateComponent,
    AdminDashboardComponent,
    AdminNavigationComponent,
    ProductManagementComponent,
    AdminLoginComponent,
    // Any other admin components
  ],
  imports: [CommonModule, RouterModule.forChild(routes), FormsModule],
  exports: [AdminNavigationComponent],
})
export class AdminAreaModule {}
