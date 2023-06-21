import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserSC } from '../../models/azure';

export const API_AZURE_SDS_URL = new InjectionToken<string>('apiUrl');

@Injectable({
  providedIn: 'root'
})
export class AzureAdService {
  isUserLoggedIn: Subject<boolean> = new Subject<boolean>();

  //url = environment.searchUrl + '/administrador/v1/';
  private _isUserAuthorized = new BehaviorSubject<boolean>(false);
  isUserAuthorized$: Observable<boolean> = this._isUserAuthorized.asObservable();
  constructor(
    private http: HttpClient,
    @Inject(API_AZURE_SDS_URL) private url: string
  ) {

  }

  postAzure(user: UserSC) {
    return this.http.post(`${this.url}Usuario`, user);
  }

  getMenuUser(userId: number) {
    return this.http.get(`${this.url}Actividad/porUsuarioId/${userId}`);
  }  



  updateAuthorizationStatus(isAuthorized: boolean): void {
    this._isUserAuthorized.next(isAuthorized);
  }
}
