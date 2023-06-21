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
    MsalModule.forRoot(
      { provide: PublicClientApplication, useFactory: MSALFactory, deps: [MsalSdsConfigService] }, 
      {
        interactionType:  InteractionType.Popup,
        authRequest: {
          scopes: [`https://saludcapitalb2c.onmicrosoft.com/guid/rol`] 
        }
      },
      {
        interactionType:  InteractionType.Popup,
        protectedResourceMap: new Map(
          [
            ['https://graph.microsoft.com/v1.0/me', ['rol']]
          ]
        ) 
      } 
    ),    
  ],
  providers: [
    MsalSdsConfigService
  ],
  exports: [
    NgxSdsLoginComponent
  ]
})
export class NgxSdsLoginModule { 
  constructor(private msalSdsConfigService: MsalSdsConfigService) {}
}
