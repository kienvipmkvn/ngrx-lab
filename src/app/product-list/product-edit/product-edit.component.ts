import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { Product } from 'src/app/shared/product.model';
import { ProductStorageService } from 'src/app/shared/product-storage.service';
import * as ProductActions from '../store/product.action';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
})
export class ProductEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') form: NgForm;
  subscription: Subscription;
  isEdit: boolean;
  productEdittingId: number;
  constructor(
    private productStorage: ProductStorageService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.subscription = this.store.select('product').subscribe((stateData) => {
      if (stateData.edittedIndex > -1) {
        this.isEdit = true;
        const product = stateData.edittedProduct;
        this.productEdittingId = product.id;
        this.form.setValue({
          productId: product.id,
          name: product.name,
          price: product.price,
          color: product.color,
          imgPath: product.imgPath,
        });
      } else {
        this.isEdit = false;
      }
    });
  }

  ngOnDestroy() {
    this.store.dispatch(new ProductActions.StopEdit());
    this.subscription.unsubscribe();
  }

  onSubmitForm(form: NgForm) {
    if (this.isEdit) {
      const value = form.value;
      const prod = new Product(
        value.productId,
        value.name,
        value.price,
        value.color,
        value.imgPath
      );
      this.store.dispatch(new ProductActions.UpdateProduct(prod));
      //this.productService.updateProduct(this.edittingIndex, prod);
      this.productStorage.editProduct(prod.id, prod);

      form.reset();
      this.isEdit = false;
      return;
    }
    let prod = new Product(
      null,
      form.value.name,
      form.value.price,
      form.value.color,
      form.value.imgPath
    );
    this.productStorage.createProduct(prod).subscribe(id=>{
      prod.id = id;
      this.store.dispatch(new ProductActions.AddProduct(prod));
    })
  }

  onClear() {
    this.form.reset();
    this.isEdit = false;
    this.store.dispatch(new ProductActions.StopEdit());
  }

  onDelete() {
    this.store.dispatch(new ProductActions.DeleteProduct());
    //this.productService.deleteProduct(this.edittingIndex);
    this.productStorage.deleteProduct(this.productEdittingId);
    this.form.reset();
    this.isEdit = false;
  }
}
