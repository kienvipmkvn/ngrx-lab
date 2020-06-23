import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompaniesComponent } from './companies.component';
import { AuthGuard } from '../auth/auth.guard';
import { CompanyStartComponent } from './company-start/company-start.component';
import { CompanyEditComponent } from './company-edit/company-edit.component';
import { CompanyDetailComponent } from './company-detail/company-detail.component';

const route: Routes = [
  {
    path: '',
    component: CompaniesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: CompanyStartComponent },
      { path: 'new', component: CompanyEditComponent },
      { path: ':id', component: CompanyDetailComponent },
      { path: ':id/edit', component: CompanyEditComponent },
    ],
  },
];

@NgModule({
    imports:[RouterModule.forChild(route)],
    exports: [RouterModule]
})
export class CompanyRoutingModule {}
