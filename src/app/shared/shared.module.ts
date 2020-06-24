import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Custom1 } from '../custom/custom1.directive';
import { Custom2Directive } from '../custom/custom2.directive';
import { LoadingSpinnerComponent } from './app-loading-spinner/app-loading-spinner.component';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  declarations: [
    Custom1,
    Custom2Directive,
    LoadingSpinnerComponent,
    AlertComponent
  ],
  imports:[CommonModule],
  exports:[
    Custom1,
    Custom2Directive,
    LoadingSpinnerComponent,
    CommonModule,
    AlertComponent
  ]
})
export class SharedModule {}
