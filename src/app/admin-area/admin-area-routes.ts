import { ProductCreateComponent } from './components/product-create/product-create.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { Routes } from '@angular/router';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { ProductManagementComponent } from './components/product-management/product-management.component';

export const routes: Routes = [
  { path: 'dashboard', component: AdminDashboardComponent },
  { path: 'products', component: ProductManagementComponent },
  { path: 'create', component: ProductCreateComponent },
  { path: 'edit/:id', component: ProductCreateComponent },
  { path: 'login', component: AdminLoginComponent },
];
