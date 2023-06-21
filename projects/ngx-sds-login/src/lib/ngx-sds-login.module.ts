import { NgModule } from '@angular/core';
import { NgxSdsLoginComponent } from './ngx-sds-login.component';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    NgxSdsLoginComponent
  ],
  imports: [
    CommonModule,       
  ],
  exports: [
    NgxSdsLoginComponent
  ]
})
export class NgxSdsLoginModule { 
}
