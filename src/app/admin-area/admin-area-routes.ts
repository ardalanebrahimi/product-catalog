// admin-area-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ProductManagementComponent } from './components/product-management/product-management.component';
import { ProductCreateComponent } from './components/product-create/product-create.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminAuthGuard } from './guards/admin-auth.guard';

export const routes: Routes = [
  { path: 'login', component: AdminLoginComponent },
  {
    path: 'dashboard',
    component: AdminDashboardComponent,
    canActivate: [AdminAuthGuard],
  },
  {
    path: 'products',
    component: ProductManagementComponent,
    canActivate: [AdminAuthGuard],
  },
  {
    path: 'create',
    component: ProductCreateComponent,
    canActivate: [AdminAuthGuard],
  },
  {
    path: 'edit/:id',
    component: ProductCreateComponent,
    canActivate: [AdminAuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminAreaRoutingModule {}
