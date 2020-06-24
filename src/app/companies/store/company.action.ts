import { Action } from '@ngrx/store';
import { Company } from '../company.model';

export const SET_COMPANIES = 'SET_COMPANIES';
export const FETCH_COMPANIES = 'FETCH_COMPANIES';
export const FETCH_COMPANIES_ERROR = 'FETCH_COMPANIES_ERROR';
export const ADD_COMPANY = 'ADD_COMPANY';
export const UPDATE_COMPANY = 'UPDATE_COMPANY';
export const DELETE_COMPANY = 'DELETE_COMPANY';
export const CLEAR_ERROR = 'CLEAR_ERROR';


export class SetCompanies implements Action {
  readonly type = SET_COMPANIES;
  constructor(public payLoad: Company[]) {}
}

export class FetchCompanies implements Action {
  readonly type = FETCH_COMPANIES;
}

export class FetchCompaniesError implements Action {
  readonly type = FETCH_COMPANIES_ERROR;
  constructor(public payLoad: string){}
}

export class AddCompany implements Action {
  readonly type = ADD_COMPANY;
  constructor(public payLoad: Company) {}
}

export class UpdateCompany implements Action {
  readonly type = UPDATE_COMPANY;
  constructor(public payLoad: { company: Company; index: number }) {}
}

export class DeleteCompany implements Action {
  readonly type = DELETE_COMPANY;
  constructor(public payLoad: number) {}
}

export class ClearError implements Action {
  readonly type = CLEAR_ERROR;
}
export type CompanyActions =
  | SetCompanies
  | FetchCompanies
  | FetchCompaniesError
  | AddCompany
  | UpdateCompany
  | DeleteCompany
  | ClearError;
