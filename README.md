# NgxSdsLogin
 Librería para Angular que encapsula la lógica de inicio de sesión contra flujo de Azure AD, y se encarga de recibir la información para generar la validación y autorización de usuarios.



## Instalación y uso

## Dependencias
#### 1. Se requiere que el proyecto tenga instalado las siguientes librerías:
```
    @azure/msal-angular: "^2.5.8",
    @azure/msal-browser: "^2.37.1",
    @ngrx/effects: "^15.1.0",
    @ngrx/store: "^15.1.0",
    @ngrx/store-devtools: "^15.1.0",
    sweetalert2: "^11.0.17"

```
Es importante tener en cuenta que rxjs depende directamente de la versión de la versión de angular.

#### 2. instale la librería 
    `npm i ngx-sds-login`


#### 3. Agrege la configuración de MsalAngular y NgxSdsLogin

En la sección imports:

    - NgxSdsLoginModule
    - MsalModule.forRoot(new PublicClientApplication(){},{}) 

En la sección de providers: 

    - API_AZURE_SDS_URL
    - URL_REDIRECT_AZURE
    - HTTP_INTERCEPTORS
    - MsalGuard
    - AzureAdService

```typescript

import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from "@angular/common";
import { MsalGuard, MsalInterceptor, MsalModule, MsalRedirectComponent } from "@azure/msal-angular";
import { InteractionType, PublicClientApplication } from "@azure/msal-browser";
import { StoreModule } from "@ngrx/store";
import { environment } from "src/environments/environment";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { API_AZURE_SDS_URL, URL_REDIRECT_AZURE, NgxSdsLoginModule, AzureAdService, userReducer } from "ngx-sds-login";


const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1;

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BootstrapModule,
    HttpClientModule,    
    NgxSdsLoginModule,
    MsalModule.forRoot(new PublicClientApplication
      (
        {
          auth: {
            clientId: environment.APP_CLIENT_ID,
            authority: environment.APP_AUTHORITY,
            redirectUri: environment.APP_REDIRECT_TO,
            knownAuthorities: [environment.APP_AUTHORITY],
          },

          cache: {
            cacheLocation: "localStorage",
            storeAuthStateInCookie: isIE
          }
        }
      ),
      {
        interactionType: isIE ? InteractionType.Redirect : InteractionType.Popup,
        authRequest: {
          scopes: [`https://saludcapitalb2c.onmicrosoft.com/${environment.APP_CLIENT_ID}/${environment.APP_ROL_URL}`] 
        }
      },
      {
        interactionType: isIE ? InteractionType.Redirect : InteractionType.Popup,
        protectedResourceMap: new Map(
          [
            ['https://graph.microsoft.com/v1.0/me', [environment.APP_ROL_URL]]
          ]
        ) 
      }      
    ),
    StoreModule.forRoot({
      user: userReducer
    }),   
    !environment.production ? StoreDevtoolsModule.instrument() : []   
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    { provide: API_AZURE_SDS_URL, useValue: environment.searchUrl + '/administrador/v1/' },
    { provide: URL_REDIRECT_AZURE, useValue: environment.postLogoutUrl },     
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    MsalGuard,
    AzureAdService
  ],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }


```

#### 4. Modificar el html del componente de arranque:

```html
<ngx-sds-login>
  <div appContent>
    <!-- Tu contenido personalizado  de inicio va aquí -->
    
  </div>
   <!-- Tu imagen de inicio va aquí -->
  <img appLogo src="RUTA_A_TU_LOGO.png" alt="Logo">
</ngx-sds-login>
```

#### 5. modifique el archivo index.html:
Adicione el componente app-redirect

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Trasplantes</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <link rel="preconnect" href="https://fonts.gstatic.com">
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
</head>
<body class="mat-typography">
  <app-root></app-root>
  <app-redirect></app-redirect>
</body>
</html>

```