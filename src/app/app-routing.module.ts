import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules, PreloadingStrategy } from '@angular/router';

const appRoutes: Routes = [
    {path:'', redirectTo:'/company', pathMatch:'full'},
    {path: 'company', loadChildren:()=>import('./companies/company.module').then(m=>m.CompanyModule)},
    {path: 'product', loadChildren:()=>import('./product-list/product.module').then(m=>m.ProductModule)},
    {path: 'auth', loadChildren:()=>import('./auth/auth.module').then(m=>m.AuthModule)}  
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule]
})
export class AppRoutingModule{}