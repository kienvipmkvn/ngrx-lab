import { Component, OnInit, OnDestroy } from '@angular/core';
import { Company } from '../company.model';
import { CompanyService } from 'src/app/shared/company.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit, OnDestroy {
  companies: Company[];
  subscription: Subscription;
  isLoading = false;
  constructor(public companyService: CompanyService) {}

  ngOnInit(): void {
    this.companies = this.companyService.getCompanies();
    this.subscription = this.companyService.companyChanged.subscribe(companies=>{
      this.companies = companies;
    })
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
