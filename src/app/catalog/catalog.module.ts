import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CATALOG_ROUTES } from './catalog.routes';
import { ProductCatalogComponent } from './product-catalog/product-catalog.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(CATALOG_ROUTES)
  ],
  declarations: [
    ProductCatalogComponent
  ]
})
export class CatalogModule { }
