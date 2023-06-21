export interface MsalSdsConfig {
    clientId: string;
    authority: string;
    redirectUri: string;
    rolUrl: string;
}
export const msalSdsConfigInitial: MsalSdsConfig = {
    clientId: '',
    authority: '',
    redirectUri: '',
    rolUrl: ''
}