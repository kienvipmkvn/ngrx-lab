import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Company } from '../companies/company.model';
import { Product } from './product.model';
import * as fromApp from '../store/app.reducer';
import * as CompanyAction from '../companies/store/company.action';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  readonly rootUrl = 'http://localhost:44388/api/';

  constructor(
    private http: HttpClient,
    private store: Store<fromApp.AppState>,
    private toastr: ToastrService
  ) {}

  postCompany(company: {
    CompanyID: number;
    Name: string;
    NumberofEmployee: number;
    Address: string;
    ImgPath: string;
    EstablishmentDay: Date;
    ListProduct: Product[];
  }) {
    
    this.http.post<number>(this.rootUrl + 'Management', company).subscribe(id=>{
      this.store.dispatch(
        new CompanyAction.AddCompany(
          new Company(
            id,
            company.Name,
            company.NumberofEmployee,
            company.Address,
            company.ImgPath,
            company.EstablishmentDay,
            company.ListProduct
          )
        )
      );
    }, error=>{
      this.toastr.error(error.message, "Cannot add company!")
    }, ()=>{
      this.toastr.success("Added successfully", "ZZZ");
    });
  }

  putCompany(company: {
    CompanyID: number;
    Name: string;
    NumberofEmployee: number;
    Address: string;
    ImgPath: string;
    EstablishmentDay: Date;
    ListProduct: Product[];
  }) {
    let products: {
      ProductID: number;
      Name: string;
      Color: string;
      Price: number;
      ImgPath: string;
    }[] = [];

    for (const prod of company.ListProduct) {
      const product = {
        ProductID: prod.id,
        Name: prod.name,
        Color: prod.color,
        Price: prod.price,
        ImgPath: prod.imgPath,
      };
      products.push(product);
    }

    const newCompany = {
      CompanyID: company.CompanyID,
      Name: company.Name,
      NumberofEmployee: company.NumberofEmployee,
      Address: company.Address,
      ImgPath: company.ImgPath,
      EstablishmentDay: company.EstablishmentDay,
      ListProduct: products,
    };
    console.log(newCompany);
    this.http
      .put(this.rootUrl + 'Management/' + company.CompanyID, newCompany)
      .subscribe(next=>next, error=>{
        this.toastr.error(error.message, "Cannot update company!")
      }, ()=>{
        this.toastr.success("Updated successfully", "ZZZ");
      });
  }

  deleteCompany(index: number) {
    this.http.delete(this.rootUrl + 'Management/' + index).subscribe(next=>next, error=>{
      this.toastr.error(error.message, "Cannot delete company!")
    }, ()=>{
      this.toastr.success("Deleted successfully", "ZZZ");
    });
  }
}
