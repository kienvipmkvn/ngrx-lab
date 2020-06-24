import { ActionReducerMap } from '@ngrx/store';

import * as fromProduct from '../product-list/store/product.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import * as fromCompany from '../companies/store/company.reducer'

export interface AppState{
    product: fromProduct.State;
    auth: fromAuth.State;
    company: fromCompany.State
}

export const appReducer: ActionReducerMap<AppState> = {
    product: fromProduct.productReducer,
    auth: fromAuth.authReducer,
    company: fromCompany.companyReducer
}