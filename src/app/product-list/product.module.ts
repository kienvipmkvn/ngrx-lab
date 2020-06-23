import { NgModule } from '@angular/core';
import { ProductListComponent } from './product-list.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProductListComponent, ProductEditComponent],
  imports:[FormsModule, SharedModule, RouterModule.forChild([
      {path: '', component: ProductListComponent}
  ])]
})
export class ProductModule {}
