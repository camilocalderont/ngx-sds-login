import { Injectable } from '@angular/core';
import { Menu, UserSC } from '../../models/azure';

@Injectable({
  providedIn: 'root'
})
export class AzureUtilsService {

  constructor() { }


  createUserAdapter(user: any) {
    let nombres = this.nameSplitter(user.given_name);
    let apellidos = this.nameSplitter(user.family_name);
    let mail = user.emails[0];
    const formattedUser: UserSC = {
      VcIdAzure: user.oid,
      VcCorreo: mail,
      VcPrimerNombre: nombres.first,
      VcPrimerApellido: apellidos.first,
      VcSegundoNombre: nombres.second,
      VcSegundoApellido: apellidos.second,
      VcIdpAzure: user.idp,
    }
    return formattedUser;
  }

  nameSplitter(name: string) {
    if(typeof name !== 'string'){
      return {
        'first': '',
        'second': ''
      };
    }
    let indexSpace: number = name.indexOf(' ');
    let compoundName = {
      'first': (indexSpace !== -1) ? name.substring(0, indexSpace) : name,
      'second': (indexSpace !== -1) ? name.substring(indexSpace) : ''
    };
    return compoundName;
  }


  menuGuardAdapter(menu:Menu[]){
    const menuGuard = this.renderMenuItems(menu);
    return menuGuard;
  }



  renderMenuItems(menu: Menu[]): string[] {
    const menuGuard: string[] = [];

    menu.forEach((item) => {
        if (item.vcRedireccion !== "#") {
            menuGuard.push(item.vcRedireccion);
        }

        if (item.hijos) {
            // Utiliza 'concat' para fusionar los resultados de la llamada recursiva
            const childRoutes = this.renderMenuItems(item.hijos);
            menuGuard.push(...childRoutes);
        }
    });

    return menuGuard;
  }  


}
