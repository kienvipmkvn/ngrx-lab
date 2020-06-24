import { Action } from '@ngrx/store';
import { Product } from 'src/app/shared/product.model';

export const ADD_PRODUCT = 'ADD_PRODUCT';
export const ADD_PRODUCTS = 'ADD_PRODUCTS';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCTS';
export const DELETE_PRODUCT = 'DELETE_PRODUCTS';
export const START_EDIT = 'START_EDIT';
export const STOP_EDIT = 'STOP_EDIT';

export class AddProduct implements Action {
  readonly type = ADD_PRODUCT;
  constructor(public payLoad: Product) {}
}

export class AddProducts implements Action {
  readonly type = ADD_PRODUCTS;
  constructor(public payLoad: Product[]) {}
}

export class UpdateProduct implements Action {
  readonly type = UPDATE_PRODUCT;
  constructor(public payLoad: Product) {}
}

export class DeleteProduct implements Action {
  readonly type = DELETE_PRODUCT;
  constructor() {}
}

export class StartEdit implements Action {
  readonly type = START_EDIT;
  constructor(public payLoad: number) {}
}

export class StopEdit implements Action {
  readonly type = STOP_EDIT;
}

export type ProductActions = AddProduct | AddProducts | UpdateProduct | DeleteProduct | StartEdit | StopEdit;