import { NgModule } from '@angular/core';
import { NgxSdsLoginComponent } from './ngx-sds-login.component';
import { CommonModule } from '@angular/common';
import { MsalModule } from '@azure/msal-angular';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { MSALFactory, MsalSdsConfigService } from './services';



@NgModule({
  declarations: [
    NgxSdsLoginComponent
  ],
  imports: [
    CommonModule,       
  ],
  providers: [
    MsalSdsConfigService
  ],
  exports: [
    NgxSdsLoginComponent
  ]
})
export class NgxSdsLoginModule { 
}
