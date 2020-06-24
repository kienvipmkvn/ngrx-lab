import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';

import { Product } from '../shared/product.model';
import * as ProductActions from '../product-list/store/product.action';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Observable<{products: Product[]}>;
  productSubcription: Subscription;
  constructor(
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.products = this.store.select('product');
  }

  onProductClick(index: number) {
    //this.productService.clickProduct(index);
    this.store.dispatch(new ProductActions.StartEdit(index));
  }
}
