import { Component, OnInit, ViewChild, Input, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/shared/product.service';
import { NgForm } from '@angular/forms';
import { Product } from 'src/app/shared/product.model';
import { Subscription } from 'rxjs';
import { ProductStorageService } from 'src/app/shared/product-storage.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
})
export class ProductEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') form: NgForm;
  subscription: Subscription;
  isEdit: boolean;
  edittingIndex: number;
  productEdittingId: number;
  constructor(private productService: ProductService, private productStorage: ProductStorageService) {}

  ngOnInit(): void {
    this.subscription = this.productService.productSelected.subscribe(
      (index) => {
        const product = this.productService.getProducts()[index];
        this.form.setValue({
          productId: product.id,
          name: product.name,
          price: product.price,
          color: product.color,
          imgPath: product.imgPath,
        });
        this.edittingIndex = index;
        this.isEdit = true;
        this.productEdittingId = product.id;
      }
    );
  }

  ngOnDestroy() {
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
      this.productService.updateProduct(this.edittingIndex, prod);
      this.productStorage.editProduct(prod.id, prod);
      
      form.reset();
      this.isEdit = false;
      return;
    }
    const prod = new Product(
      form.value.productId,
      form.value.name,
      form.value.price,
      form.value.color,
      form.value.imgPath
    );
    this.productStorage.createProduct(prod);
  }

  onClear() {
    this.form.reset();
    this.isEdit = false;
  }

  onDelete() {
    this.productService.deleteProduct(this.edittingIndex);
    this.productStorage.deleteProduct(this.productEdittingId);
    this.form.reset();
    this.isEdit = false;
  }
}
