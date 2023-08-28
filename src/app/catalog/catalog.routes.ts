import { Routes } from '@angular/router';
import { ProductCatalogComponent } from './product-catalog/product-catalog.component';

export const CATALOG_ROUTES: Routes = [
    {
      path: 'product-catalog',
      component: ProductCatalogComponent
    },
    {
      path: '',
      component: ProductCatalogComponent
    }
];
