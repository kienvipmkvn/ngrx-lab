import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.action';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit, OnDestroy {
  isLogin: boolean = true;
  isLoading = false;
  errorMsg: string = null;
  signUpSuccess: string = null;

  storeSub: Subscription;
  constructor(
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.storeSub = this.store.select('auth').subscribe((authData) => {
      this.isLoading = authData.loading;
      this.errorMsg = authData.authError;
    });
  }

  ngOnDestroy(){
    this.storeSub.unsubscribe();
  }

  onSubmit(form: NgForm) {
    if (this.isLogin) {
      this.isLoading = true;
      this.store.dispatch(
        new AuthActions.LoginStart({
          email: form.value['email'],
          password: form.value['password'],
        })
      );
    } else {
      this.store.dispatch(
        new AuthActions.SignupStart({
          email: form.value['email'],
          password: form.value['password'],
        })
      );
      form.reset();
    }
  }

  onSwitch() {
    this.isLogin = !this.isLogin;
  }

  onClose() {
    this.store.dispatch(new AuthActions.ClearError());
  }
}
