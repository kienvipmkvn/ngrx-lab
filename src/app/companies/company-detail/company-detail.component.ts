import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';

import { Company } from '../company.model';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import * as ProductActions from '../../product-list/store/product.action';
import * as fromApp from '../../store/app.reducer';
import * as CompanyAction from '../store/company.action';
import { map, switchMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.css'],
})
export class CompanyDetailComponent implements OnInit {
  company: Company;
  id: number;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataStorageService,
    private store: Store<fromApp.AppState>,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(
      map((params) => {
        return +params['id'];
      }),
      switchMap((id) => {
        this.id = id;
        return this.store.select('company');
      }),
      map((companyState) => {
        return companyState.companies.find((company, index) => {
          return index === this.id;
        });
      })
    ).subscribe(company=>{
      this.company = company;
    });
  }

  toProduct() {
    this.store.dispatch(new ProductActions.AddProducts(this.company.products));
    this.toastr.success("Moved to product component successfully!", "ZZZ");
    //this.productService.addProducts(this.company.products);
  }

  onDelete() {
    if(confirm("Delete?")){
      this.dataService.deleteCompany(this.company.id);
      //this.companyService.deleteCompany(this.id);
      this.store.dispatch(new CompanyAction.DeleteCompany(this.id));
      this.router.navigate(['company']);
    }
  }
}
