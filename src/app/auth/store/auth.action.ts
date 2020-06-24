import { Action } from '@ngrx/store';

export const LOGIN_START = 'LOGIN_START';
export const AUTHENTICATE_SUCCESS = 'AUTHENTICATE_SUCCESS';
export const AUTHENTICATE_ERROR = 'LOGIN_ERROR';
export const LOGOUT = 'LOGOUT';
export const SIGNUP_START = 'SIGNUP_START';
export const CLEAR_ERROR = 'CLEAR_ERROR';
export const AUTO_LOGIN = 'AUTO_LOGIN';

export class AuthenticateSuccess implements Action {
  readonly type = AUTHENTICATE_SUCCESS;
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class LoginStart implements Action {
  readonly type = LOGIN_START;
  constructor(public payLoad: { email: string; password: string }) {}
}

export class AuthenticateError implements Action {
  readonly type = AUTHENTICATE_ERROR;
  constructor(public payLoad: string) {}
}

export class SignupStart implements Action {
  readonly type = SIGNUP_START;
  constructor(public payLoad: { email: string; password: string }) {}
}

export class ClearError implements Action {
  readonly type = CLEAR_ERROR;
}

export class AutoLogin implements Action {
  readonly type = AUTO_LOGIN;
}

export type AuthType =
  | AuthenticateSuccess
  | Logout
  | LoginStart
  | AuthenticateError
  | SignupStart
  | ClearError
  | AutoLogin;
