import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly urlSignup =
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyArSOV76OtAaOkz_jkIsLmt9PCHxTMseV0';

  readonly urlLogin =
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyArSOV76OtAaOkz_jkIsLmt9PCHxTMseV0';
    
  isLogin = false;

  constructor(private http: HttpClient) {}

  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(this.urlSignup, {
        email: email,
        password: password,
        returnSecurityToken: true,
      })
  }

  
  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(this.urlLogin, {
      email: email,
      password: password,
      returnSecurityToken: true,
    })
  }

  autoLogin(){
    const userData = localStorage.getItem('userData');
    if(userData==null) return;
    else this.isLogin = true;
  }

  logout(){
    this.isLogin = false;
    localStorage.clear();
  }

  storeResposeData(resData: AuthResponseData){
    localStorage.setItem("userData", JSON.stringify(resData));
  }
}
