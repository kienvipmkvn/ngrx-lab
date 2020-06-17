import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { Company } from '../companies/company.model';
import { CompanyService } from './company.service';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  readonly rootUrl = 'https://localhost:44388/api/';

  constructor(
    private http: HttpClient,
    private companyService: CompanyService
  ) {}

  getCompanies() {
    this.http
      .get(this.rootUrl + 'Management')
      .pipe(
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
            console.log(companies);
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
        )
      )
      .subscribe((companies) => {
        this.companyService.setCompanies(companies);
        console.log(companies);
      });
  }

  postCompany(company: {
    CompanyID: number;
    Name: string;
    NumberofEmployee: number;
    Address: string;
    ImgPath: string;
    EstablishmentDay: Date;
  }) {
    this.companyService.addCompany(
      new Company(
        company.CompanyID,
        company.Name,
        company.NumberofEmployee,
        company.Address,
        company.ImgPath,
        company.EstablishmentDay,
        []
      )
    );
    this.http.post(this.rootUrl + 'Management', company).subscribe();
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

    this.http
      .put(this.rootUrl + 'Management/' + company.CompanyID, newCompany)
      .subscribe();
  }

  deleteCompany(index: number) {
    this.http.delete(this.rootUrl + 'Management/' + index).subscribe();
  }
}
