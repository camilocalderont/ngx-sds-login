import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import * as UserActions from './user.actions';

@Injectable()
export class UserEffects {
  
  saveUserToLocalStorage$ = createEffect(() => 
    this.actions$.pipe(
      ofType(UserActions.createUser, UserActions.modifyUser),
      tap(action => {
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
    ),
    { dispatch: false }  // No despacha una acción adicional después de completarse.
  );

  constructor(private actions$: Actions) {}
}
