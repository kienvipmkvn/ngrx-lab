import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../shared/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private subsciption: Subscription;
  isLogin = false;

  constructor(private dataService: DataStorageService,
    public authService: AuthService) { }

  ngOnInit(): void {
  }

  fetchData(){
    this.dataService.getCompanies();
  }

  ngOnDestroy(){
    this.subsciption.unsubscribe();
  }

  onLogout(){
    this.authService.logout();
  }
}
