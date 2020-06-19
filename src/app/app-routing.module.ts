import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompaniesComponent } from './companies/companies.component';
import { ProductListComponent } from './product-list/product-list.component';
import { CompanyStartComponent } from './companies/company-start/company-start.component';
import { CompanyDetailComponent } from './companies/company-detail/company-detail.component';
import { CompanyEditComponent } from './companies/company-edit/company-edit.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';

const appRoutes: Routes = [
    {path:'', redirectTo:'/company', pathMatch:'full'},
    {path: 'company', component: CompaniesComponent, canActivate: [AuthGuard] ,children: [
        {path: '', component: CompanyStartComponent},
        {path: 'new', component: CompanyEditComponent},
        {path: ':id', component: CompanyDetailComponent},
        {path: ':id/edit', component: CompanyEditComponent},
    ]},
    {path: 'product', component: ProductListComponent, canActivate: [AuthGuard]},
    {path: 'auth', component: AuthComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule{}