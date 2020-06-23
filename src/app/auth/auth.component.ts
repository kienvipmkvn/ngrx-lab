import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  isLogin: boolean = true;
  isLoading = false;
  errorMsg: string = null;
  signUpSuccess: string = null;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    //login
    if (this.isLogin) {
      this.isLoading = true;
      this.authService
        .login(form.value['email'], form.value['password'])
        .subscribe(
          (resData) => {
            console.log(resData);
            this.isLoading = false;
            this.authService.isLogin = true;
            this.router.navigate(['company']);
            this.authService.storeResposeData(resData);
          },
          (error) => {
            this.isLoading = false;
            this.signUpSuccess = null;
            switch (error.error.error.message) {
              case 'EMAIL_NOT_FOUND':
                this.errorMsg = 'This email is not found!';
                break;
              case 'INVALID_PASSWORD':
                this.errorMsg = 'Wrong password!';
                break;

              default:
                this.errorMsg = 'An unknown error occured!';
                break;
            }
            console.log(error);
          }
        );
      return;
    }
    //sign up
    this.isLoading = true;
    this.authService
      .signUp(form.value['email'], form.value['password'])
      .subscribe(
        (resData) => {
          console.log(resData);
          this.isLoading = false;
          this.signUpSuccess = 'Sign up successfully!';
          this.errorMsg = null;
        },
        (error) => {
          this.isLoading = false;
          this.signUpSuccess = null;
          switch (error.error.error.message) {
            case 'EMAIL_EXISTS':
              this.errorMsg = 'This email already exists!';
              break;
            case 'OPERATION_NOT_ALLOWED':
              this.errorMsg = 'Password sign-in is disabled for this project!';
              break;
            case 'INVALID_EMAIL':
              this.errorMsg = 'Email is invalid!';
              break;

            default:
              this.errorMsg = 'An unknown error occured!';
              break;
          }
          console.log(error.error.error.message);
        }
      );
    form.reset();
  }

  onSwitch() {
    this.isLogin = !this.isLogin;
  }

  onClose(){
    this.errorMsg = null;
  }
}
