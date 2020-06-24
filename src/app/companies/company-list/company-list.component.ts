import { Component, OnInit, OnDestroy } from '@angular/core';
import { Company } from '../company.model';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducer'
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit, OnDestroy {
  companies: Company[];
  subscription: Subscription;
  isLoading = false;
  errorMessage = null;
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.subscription = this.store.select('company')
    .pipe(map(companyState=>{
      this.errorMessage = companyState.errorMsg;
      this.isLoading = companyState.isLoading;
      return companyState.companies
    }))
    .subscribe(companies=>{
      this.companies = companies;
    })
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
