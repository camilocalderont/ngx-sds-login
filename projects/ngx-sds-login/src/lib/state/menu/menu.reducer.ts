// user/user.reducer.ts
import { createReducer, Action, on } from '@ngrx/store';
import * as UserActions from './menu.actions';
import { Menu, MenuEmptyState } from '../../models/azure';

const initialState: Menu[] = MenuEmptyState;

export const menuReducer = createReducer(
  initialState,
  on(UserActions.createMenu, (state, { payload }) => ([ ...payload ])),
  on(UserActions.modifyMenu, (state, { payload }) => ([ ...payload ])),
  on(UserActions.resetMenu, state => ([ ...MenuEmptyState ]))
);

export function reducer(state: Menu[] | undefined, action: Action) {
  return menuReducer(state, action);
}