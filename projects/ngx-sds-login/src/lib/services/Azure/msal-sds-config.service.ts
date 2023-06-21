import { Injectable } from '@angular/core';
import { MsalSdsConfig, msalSdsConfigInitial } from '../../models/azure';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';

const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1;
@Injectable()
export class MsalSdsConfigService {
    private config: MsalSdsConfig;

    constructor() { 
        this.config = msalSdsConfigInitial;
    }

    setConfig(config: MsalSdsConfig): void {
        this.config = config;
    }

    getConfig(): MsalSdsConfig {
        return this.config;
    }

    getAuthConfig(): any {
  
        return {
            auth: {
              clientId: this.config.clientId,
              authority: this.config.authority,
              redirectUri: this.config.redirectUri,
              knownAuthorities: [this.config.authority],
            },
  
            cache: {
              cacheLocation: "localStorage",
              storeAuthStateInCookie: isIE
            }
        };
    }

    getInteractionConfig(): any {
        return {
            interactionType: isIE ? InteractionType.Redirect : InteractionType.Popup,
            authRequest: {
              scopes: [`https://saludcapitalb2c.onmicrosoft.com/${this.config.clientId}/${this.config.rolUrl}`] 
            }
        }
    }

    getGraphConfig(): any {
        return  {
            interactionType: isIE ? InteractionType.Redirect : InteractionType.Popup,
            protectedResourceMap: new Map(
              [
                ['https://graph.microsoft.com/v1.0/me', [this.config.rolUrl]]
              ]
            ) 
        } 
    }    



}


export function MSALFactory(configService: MsalSdsConfigService) {
    return new PublicClientApplication(configService.getAuthConfig());
}