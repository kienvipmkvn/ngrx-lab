import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CompaniesComponent } from './companies/companies.component';
import { CompanyListComponent } from './companies/company-list/company-list.component';
import { CompanyItemComponent } from './companies/company-list/company-item/company-item.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductEditComponent } from './product-list/product-edit/product-edit.component';
import { CompanyDetailComponent } from './companies/company-detail/company-detail.component';
import { Custom1 } from './custom/custom1.directive';
import { Custom2Directive } from './custom/custom2.directive';
import { AppRoutingModule } from './app-routing.module';
import { CompanyStartComponent } from './companies/company-start/company-start.component';
import { CompanyEditComponent } from './companies/company-edit/company-edit.component';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './shared/app-loading-spinner/app-loading-spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CompaniesComponent,
    CompanyListComponent,
    CompanyItemComponent,
    ProductListComponent,
    ProductEditComponent,
    CompanyDetailComponent,
    Custom1,
    Custom2Directive,
    CompanyStartComponent,
    CompanyEditComponent,
    AuthComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
