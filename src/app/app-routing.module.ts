import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductCreateComponent } from './product-create/product-create.component';
import { LandingPageComponent } from './landing-page.component/landing-page.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'home', component: LandingPageComponent },
  {
    path: 'catalog',
    loadChildren: () =>
      import('./catalog/catalog.module').then((m) => m.CatalogModule),
  },
  { path: 'create', component: ProductCreateComponent },
  { path: 'edit/:id', component: ProductCreateComponent },
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
