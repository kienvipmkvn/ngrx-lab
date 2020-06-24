import { Actions, ofType, Effect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import * as AuthActions from './auth.action';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

const handleAuth = (resData: AuthResponseData) => {
  localStorage.setItem('userData', JSON.stringify(resData));
  return new AuthActions.AuthenticateSuccess();
};
const handleError = (error: any) => {
  let errorMsg = '';
  switch (error.error.error.message) {
    case 'EMAIL_NOT_FOUND':
      errorMsg = 'This email is not found!';
      break;
    case 'INVALID_PASSWORD':
      errorMsg = 'Wrong password!';
      break;
    case 'EMAIL_EXISTS':
      errorMsg = 'This email already exists!';
      break;
    case 'OPERATION_NOT_ALLOWED':
      errorMsg = 'Password sign-in is disabled for this project!';
      break;
    case 'INVALID_EMAIL':
      errorMsg = 'Email is invalid!';
      break;
    default:
      errorMsg = 'An unknown error occured!';
      break;
  }
  return of(new AuthActions.AuthenticateError(errorMsg));
};

@Injectable()
export class AuthEffects {
  readonly urlSignup =
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyArSOV76OtAaOkz_jkIsLmt9PCHxTMseV0';

  readonly urlLogin =
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyArSOV76OtAaOkz_jkIsLmt9PCHxTMseV0';

  @Effect()
  authSignup = this.actions$.pipe(
    ofType(AuthActions.SIGNUP_START),
    switchMap((signupAction: AuthActions.SignupStart) => {
      return this.http
        .post<AuthResponseData>(this.urlSignup, {
          email: signupAction.payLoad.email,
          password: signupAction.payLoad.password,
          returnSecurityToken: true,
        })
        .pipe(
          map((resData) => {
            return handleAuth(resData);
          }),
          catchError((error) => {
            return handleError(error);
          })
        );
    })
  );

  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      return this.http
        .post<AuthResponseData>(this.urlLogin, {
          email: authData.payLoad.email,
          password: authData.payLoad.password,
          returnSecurityToken: true,
        })
        .pipe(
          map((resData) => {
            return handleAuth(resData);
          }),
          catchError((error) => {
            return handleError(error);
          })
        );
    })
  );

  @Effect({ dispatch: false })
  authAuthSuccess = this.actions$.pipe(
    ofType(AuthActions.AUTHENTICATE_SUCCESS),
    tap(() => {
      this.router.navigate(['/']);
    })
  );

  @Effect({ dispatch: false })
  authLogout = this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    tap(() => {
      localStorage.clear();
      this.router.navigate(['auth']);
    })
  );

  @Effect()
  autoLogin = this.actions$.pipe(
    ofType(AuthActions.AUTO_LOGIN),
    map(()=>{
      if(localStorage.getItem('userData')==null) return {type: 'test'};
      else return new AuthActions.AuthenticateSuccess;
    })
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router
  ) {}
}
