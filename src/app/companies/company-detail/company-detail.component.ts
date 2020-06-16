import { Component, OnInit } from '@angular/core';
import { Company } from '../company.model';
import { ProductService } from 'src/app/shared/product.service';
import { CompanyService } from 'src/app/shared/company.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.css']
})
export class CompanyDetailComponent implements OnInit {
  company: Company;
  id: number;
  constructor(
    private companyService: CompanyService, 
    private productService: ProductService, 
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      this.id = +params['id'];
      this.company = this.companyService.getCompanies()[this.id];
    })
  }

  toProduct(){
    this.productService.addProducts(this.company.products);
  }

  onDelete(){
    this.companyService.deleteCompany(this.id);
    this.router.navigate(['company'])
  }
}
