import { Actions, Effect, ofType } from '@ngrx/effects';

import * as CompanyActions from './company.action';
import { switchMap, map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Company } from '../company.model';
import { Product } from 'src/app/shared/product.model';
import { of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class CompanyEffects {
  @Effect()
  fetchCompany = this.actions$.pipe(
    ofType(CompanyActions.FETCH_COMPANIES),
    switchMap(() => {
      return this.http.get(this.rootUrl + 'Management').pipe(
        map(
          (
            companies: [
              {
                CompanyID: number;
                Name: string;
                NumberofEmployee: number;
                Address: string;
                ImgPath: string;
                EstablishmentDay: Date;
                ListProduct: [
                  {
                    ProductID: number;
                    Name: string;
                    Price: number;
                    Color: string;
                    ImgPath: string;
                  }
                ];
              }
            ]
          ) => {
            let companyList: Company[] = [];
            for (const company of companies) {
              let prods: Product[] = [];
              for (const product of company.ListProduct) {
                prods.push(
                  new Product(
                    product.ProductID,
                    product.Name,
                    product.Price,
                    product.Color,
                    product.ImgPath
                  )
                );
              }
              let com = new Company(
                company.CompanyID,
                company.Name,
                company.NumberofEmployee,
                company.Address,
                company.ImgPath,
                company.EstablishmentDay,
                prods
              );
              companyList.push(com);
            }
            return companyList;
          }
        ),
        map((companies) => {
          return new CompanyActions.SetCompanies(companies);
        }),
        catchError((error) => {
          this.toastr.error('An error occurred!', 'ERROR');
          return of(new CompanyActions.FetchCompaniesError(error.message));
        })
      );
    })
  );

  readonly rootUrl = 'http://localhost:44388/api/';
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private toastr: ToastrService
  ) {}
}
