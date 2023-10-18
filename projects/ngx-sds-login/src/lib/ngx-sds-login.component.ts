import { Inject, InjectionToken } from '@angular/core';
import { Component } from '@angular/core';
import { MsalGuardConfiguration, MSAL_GUARD_CONFIG, MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { InteractionStatus, RedirectRequest } from '@azure/msal-browser';
import { Store } from '@ngrx/store';
import { AzureAdService } from './services/Azure/azure-ad.service';
import { AzureUtilsService } from './utils/azure/azure.utils.service';
import { Subject, filter, takeUntil, tap } from 'rxjs';
import { AppState } from './state/app.state';
import { EstadoUsuario, Menu, UserLogin } from './models/azure';
import Swal from 'sweetalert2';
import { UserActions } from './state';
import { MenuActions } from './state';

export const URL_REDIRECT_AZURE = new InjectionToken<string>('postLogoutUrl');

@Component({
  selector: 'ngx-sds-login',
  templateUrl: './ngx-sds-login.component.html',
  styleUrls: ['./ngx-sds-login.component.css']
})
export class NgxSdsLoginComponent {
  private readonly _destroying$ = new Subject<void>();
  isUserLoggedIn: boolean = false;

  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private msalBroadcastService: MsalBroadcastService,
    private authService: MsalService,
    public azureAdService: AzureAdService,
    private azureUtils: AzureUtilsService,
    @Inject(Store) private store: Store<AppState>,
    @Inject(URL_REDIRECT_AZURE) private postLogoutUrl: string
  ) {
    // this._destroying$ = this.store.select(state => state.user)
  }

  ngOnInit(): void {

    this.msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        this.createAzureConnection();
      });

    this.store.select('user').subscribe((user: UserLogin) => {
      localStorage.setItem('user', JSON.stringify(user));
    });

  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }


  createAzureConnection(){
    this.isUserLoggedIn = this.authService.instance.getAllAccounts().length > 0;
        if (this.isUserLoggedIn) {

          let user = this.azureUtils.createUserAdapter(this.authService.instance.getAllAccounts()[0].idTokenClaims);
          this.azureAdService.postAzure(user).subscribe({
            next:(resp: any) => {
              //console.log(resp.data);
              this.verificarEstadoUsuario(resp.data as UserLogin);
            },
            error: (error: any) => {
              const responseError = error.error as any;
              Swal.fire({
                title: 'Alerta de inicio de sesión',
                text: `${responseError.message} ¿Desea continuar con el usuario encontrado?`,
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#2d496f',
                cancelButtonColor: '#d33',
                cancelButtonText: 'No',
                confirmButtonText: 'Sí',
                focusConfirm: false,
                focusCancel: true,
                focusDeny: true
              }).then((result: any) => {
                if (result.isConfirmed){
                  this.verificarEstadoUsuario(responseError.data as UserLogin);
                }else{
                  this.logout();
                }
              });
            }
          });
        }
        //Se debe quitar?
        this.azureAdService.isUserLoggedIn.next(this.isUserLoggedIn);
  }

  login() {
    //debugger;
    if (this.msalGuardConfig.authRequest) {
      this.authService.loginRedirect({ ...this.msalGuardConfig.authRequest } as RedirectRequest);
    } else {
      this.authService.loginRedirect();
    }
  }

  logout() {
    this.authService.logoutRedirect({ postLogoutRedirectUri: this.postLogoutUrl });
  }

  verificarEstadoUsuario(user:UserLogin){
    if(user.iEstado !== EstadoUsuario.Activo){
      Swal.fire({
        title: 'Alerta de inicio de sesión',
        text: `El usuario ${user.vcCorreo} se encuentra en estado: (${EstadoUsuario[user.iEstado]}). contacte al administrador para activar su cuenta`,
        icon: 'warning',
        confirmButtonColor: '#2d496f',
      }).then((result: any) => {
        this.logout();
      });
    }else{
      const storedUser = localStorage.getItem('user');
      if (!storedUser) {
        this.store.dispatch(UserActions.createUser({ payload: user as UserLogin }));
      }
      this.getMenuAndUpdateAuthorizationStatus(user.id);
    }

  }

  getMenuAndUpdateAuthorizationStatus(userId: number) {
    this.azureAdService.getMenuUser(userId).pipe(
      tap((resp: any) => {
        const menuArray: Menu[] = resp.data as Menu[];
        const menuGuard: string[] = this.azureUtils.menuGuardAdapter(menuArray);
        this.store.dispatch(MenuActions.createMenu({ payload: menuArray as Menu[] }));
        //validar si la elimino
        this.azureAdService.updateAuthorizationStatus(menuGuard.length > 0);
      })
    ).subscribe();
  }
}
