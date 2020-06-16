import { Component, OnInit, ViewChild, Input, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/shared/product.service';
import { NgForm } from '@angular/forms';
import { Product } from 'src/app/shared/product.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') form: NgForm;
  subscription: Subscription;
  isEdit: boolean;
  edittingIndex: number;
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.subscription = this.productService.productSelected.subscribe(index=>{
      const product = this.productService.getProducts()[index];
      this.form.setValue({
        name: product.name,
        price: product.price,
        color: product.color,
        imgPath: product.imgPath
      });
      this.edittingIndex = index;
      this.isEdit = true;
    })
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onSubmitForm(form: NgForm){
    if(this.isEdit){
      const value = form.value;
      const prod = new Product(value.name, value.price, value.color, value.imgPath);
      this.productService.updateProduct(this.edittingIndex, prod);
      form.reset();
      this.isEdit = false;
      return;
    }
    const prod = new Product(form.value.name, form.value.price, form.value.color, form.value.imgPath);
    this.productService.addProduct(prod);
  }

  onClear(){
    this.form.reset();
    this.isEdit = false;
  }

  onDelete(){
    this.productService.deleteProduct(this.edittingIndex);
    this.form.reset();
    this.isEdit = false;
  }
}
