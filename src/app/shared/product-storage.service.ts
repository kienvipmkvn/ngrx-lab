import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ProductService } from './product.service';
import { Product } from './product.model';
import { DataStorageService } from './data-storage.service';
import { CompanyService } from './company.service';

@Injectable({
    providedIn:"root"
})
export class ProductStorageService{
    readonly url = "http://localhost:44388/api/Product/";

    constructor(private http: HttpClient, private productService: ProductService,
        private dataService:DataStorageService){}

    createProduct(product:Product){
        this.productService.addProduct(product);
        this.http.post(this.url, product).subscribe();
    }

    editProduct(id: number, product: Product){
        this.http.put(this.url+id, product).subscribe(()=>{
            this.dataService.getCompanies();
        });
    }

    deleteProduct(id: number){
        this.http.delete(this.url+id).subscribe(()=>{
            this.dataService.getCompanies();
        });
    }
}