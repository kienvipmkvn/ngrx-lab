import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

import * as CompanyActions from '../store/company.action';
import { Company } from '../company.model';
import { Product } from 'src/app/shared/product.model';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css'],
})
export class CompanyEditComponent implements OnInit, OnDestroy {
  id: number;
  editMode = false;
  companyForm: FormGroup;
  private sub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private router: Router,
    private dataService: DataStorageService,
    private store: Store<fromApp.AppState>,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  ngOnDestroy() {
    if (this.sub != null) this.sub.unsubscribe();
  }

  onSubmit() {
    if(confirm(this.editMode? "Confirm Edit?":"Confirm Create?")){const id = +this.companyForm.value['id'];
    const name = this.companyForm.value['name'];
    const numberofEmployee = this.companyForm.value['noe'];
    const address = this.companyForm.value['add'];
    const establishmentDay = this.companyForm.value['esday'];
    const img = this.companyForm.value['imgPath'];
    let products: Product[] = [];
    for (const formGroup of (<FormArray>this.companyForm.get('products'))
      .controls) {
      products.push(formGroup.value);
    }

    const company = new Company(
      id,
      name,
      numberofEmployee,
      address,
      img,
      establishmentDay,
      products
    );
    let com = {
      CompanyID: company.id,
      Name: company.name,
      NumberofEmployee: company.numberofEmployee,
      Address: company.address,
      ImgPath: company.imgPath,
      EstablishmentDay: company.establishmentDay,
      ListProduct: company.products,
    };
    if (this.editMode) {
      this.dataService.putCompany(com);
      //this.companyService.updateCompany(this.id, company);
      this.store.dispatch(
        new CompanyActions.UpdateCompany({ company: company, index: this.id })
      );
    } else {
      this.dataService.postCompany(com);
      //this.store.dispatch(new CompanyActions.AddCompany(company));
    }
    this.router.navigate(['company']);}
  }

  private initForm() {
    let id = null;
    let name = '';
    let noe: number = null;
    let add = '';
    let esday = new Date().toString();
    let imgPath = '';
    let products = new FormArray([]);

    if (this.editMode) {
      //const company = this.companyService.getCompanies()[this.id];
      this.sub = this.store
        .select('company')
        .pipe(
          map((companyState) => {
            return companyState.companies.find((company, index) => {
              return index === this.id;
            });
          })
        )
        .subscribe((company) => {
          id = company.id;
          name = company.name;
          noe = company.numberofEmployee;
          add = company.address;
          esday = this.datePipe.transform(
            company.establishmentDay,
            'yyyy-MM-dd'
          );
          imgPath = company.imgPath;

          if (company.products.length > 0) {
            for (const product of company.products) {
              products.push(
                new FormGroup({
                  id: new FormControl(product.id),
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
        });
    }

    this.companyForm = new FormGroup({
      id: new FormControl(id),
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
        id: new FormControl(null),
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

  onCancel() {
    this.router.navigate(['company']);
  }

  onDeleteProduct(index: number) {
    (<FormArray>this.companyForm.get('products')).controls.splice(index, 1);
  }
}
