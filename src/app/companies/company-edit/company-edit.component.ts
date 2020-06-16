import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { CompanyService } from 'src/app/shared/company.service';
import { Company } from '../company.model';
import { Product } from 'src/app/shared/product.model';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css'],
})
export class CompanyEditComponent implements OnInit {
  id: number;
  editMode = false;
  companyForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private companyService: CompanyService,
    private datePipe: DatePipe,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  onSubmit() {
    const name = this.companyForm.value["name"];
    const numberofEmployee = this.companyForm.value["noe"];
    const address = this.companyForm.value["add"];
    const establishmentDay = this.companyForm.value["esday"];
    const img = this.companyForm.value["imgPath"];
    let products: Product[] = [];
    for (const formGroup of (<FormArray>this.companyForm.get("products")).controls) {
      products.push(formGroup.value);
    }

    const company = new Company(name, numberofEmployee, address, img, establishmentDay, products);
    if(this.editMode){
      this.companyService.updateCompany(this.id, company);
    }else{
      this.companyService.addCompany(company);
    }
  }

  private initForm() {
    let name = '';
    let noe: number = null;
    let add = '';
    let esday = new Date().toString();
    let imgPath = '';
    let products = new FormArray([]);

    if (this.editMode) {
      const company = this.companyService.getCompanies()[this.id];
      name = company.name;
      noe = company.numberofEmployee;
      add = company.address;
      esday = this.datePipe.transform(company.establishmentDay, 'yyyy-MM-dd');
      imgPath = company.imgPath;
      if (company.products.length > 0) {
        for (const product of company.products) {
          products.push(
            new FormGroup({
              name: new FormControl(product.name, Validators.required),
              price: new FormControl(product.price, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/),
              ]),
              color: new FormControl(product.color, Validators.required),
              imgPath: new FormControl(product.imgPath),
            })
          );
        }
      }
    }

    this.companyForm = new FormGroup({
      name: new FormControl(name, Validators.required),
      noe: new FormControl(noe, Validators.required),
      add: new FormControl(add, Validators.required),
      esday: new FormControl(esday, Validators.required),
      imgPath: new FormControl(imgPath),
      products: products,
    });
  }

  getControls() {
    return (<FormArray>this.companyForm.get('products')).controls;
  }

  onAddProduct() {
    (<FormArray>this.companyForm.get('products')).controls.push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        price: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
        color: new FormControl(null, Validators.required),
        imgPath: new FormControl(null),
      })
    );
  }

  onCancel(){
    this.router.navigate(['company']);
  }

  onDeleteProduct(index: number){
    (<FormArray>this.companyForm.get("products")).controls.splice(index, 1);
  }
}
