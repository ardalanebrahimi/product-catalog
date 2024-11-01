import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductCreateComponent } from './product-create/product-create.component';
import { LandingPageComponent } from './landing-page.component/landing-page.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { ProductViewComponent } from './product-view/product-view.component';

const routes: Routes = [
  { path: 'home', component: LandingPageComponent },
  {
    path: 'catalog',
    loadChildren: () =>
      import('./catalog/catalog.module').then((m) => m.CatalogModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'create',
    component: ProductCreateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit/:id',
    component: ProductCreateComponent,
    canActivate: [AuthGuard],
  },
  { path: 'products/:id', component: ProductViewComponent },

  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: '*',
    redirectTo: '/home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
