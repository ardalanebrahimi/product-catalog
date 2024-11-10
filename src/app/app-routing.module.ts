import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin-area/admin-area.module').then((m) => m.AdminAreaModule),
  },
  {
    path: 'shop',
    loadChildren: () =>
      import('./customer-area/customer-area.module').then(
        (m) => m.CustomerAreaModule
      ),
  },
  { path: '', redirectTo: 'shop', pathMatch: 'full' },
  { path: '**', redirectTo: 'shop' },
];
