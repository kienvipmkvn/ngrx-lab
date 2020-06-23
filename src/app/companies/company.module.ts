import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { CompaniesComponent } from './companies.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { CompanyItemComponent } from './company-list/company-item/company-item.component';
import { CompanyStartComponent } from './company-start/company-start.component';
import { CompanyEditComponent } from './company-edit/company-edit.component';
import { CompanyDetailComponent } from './company-detail/company-detail.component';
import { CompanyRoutingModule } from './company-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    CompaniesComponent,
    CompanyListComponent,
    CompanyItemComponent,
    CompanyDetailComponent,
    CompanyStartComponent,
    CompanyEditComponent,
  ],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CompanyRoutingModule,
    SharedModule,
  ],
})
export class CompanyModule {}
