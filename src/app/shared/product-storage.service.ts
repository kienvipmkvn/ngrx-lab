import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Product } from './product.model';
import { DataStorageService } from './data-storage.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as CompanyAction from '../companies/store/company.action';

@Injectable({
    providedIn:"root"
})
export class ProductStorageService{
    readonly url = "http://localhost:44388/api/Product/";

    constructor(private http: HttpClient,
        private store: Store<fromApp.AppState>){}

    createProduct(product:Product){
        //this.productService.addProduct(product);
        return this.http.post<number>(this.url, product);
    }

    editProduct(id: number, product: Product){
        this.http.put(this.url+id, product).subscribe(()=>{
            //this.dataService.getCompanies();
            this.store.dispatch(new CompanyAction.FetchCompanies());
        });
    }

    deleteProduct(id: number){
        this.http.delete(this.url+id).subscribe(()=>{
            // this.dataService.getCompanies();
            this.store.dispatch(new CompanyAction.FetchCompanies());
        });
    }
}