import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { DataStorageService } from '../shared/data-storage.service';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.action';
import * as CompanyActions from '../companies/store/company.action'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private subsciption: Subscription;
  isLogin = false;

  constructor(public store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.subsciption = this.store.select('auth').subscribe(stateData=>{
      this.isLogin = stateData.isLogin;
    })
  }

  fetchData(){
    // this.dataService.getCompanies();
    this.store.dispatch(new CompanyActions.FetchCompanies())
  }

  ngOnDestroy(){
    this.subsciption.unsubscribe();
  }

  onLogout(){
    //this.authService.logout();
    localStorage.clear();
    this.store.dispatch(new AuthActions.Logout());
  }
}
