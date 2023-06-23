import { NgModule } from '@angular/core';
import { NgxSdsLoginComponent } from './ngx-sds-login.component';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './state/user/user.reducer';
import { menuReducer } from './state/menu/menu.reducer';
const rootReducer = {
  user: userReducer,
  menu: menuReducer
};

@NgModule({
  declarations: [
    NgxSdsLoginComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forRoot(rootReducer)
  ],
  exports: [
    NgxSdsLoginComponent
  ]
})
export class NgxSdsLoginModule {
}
