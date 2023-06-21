// user/user.reducer.ts
import { createReducer, Action, on } from '@ngrx/store';
import * as UserActions from './user.actions';
import { UserLogin, UserLoginEmptyState } from '../../models/azure';


const initialState: UserLogin = UserLoginEmptyState;

export const userReducer = createReducer(
  initialState,
  on(UserActions.createUser, (state, { payload }) => ({ ...state, ...payload })),
  on(UserActions.modifyUser, (state, { payload }) => ({ ...state, ...payload })),
  on(UserActions.resetUser, state => ({ ...UserLoginEmptyState }))
);

export function reducer(state: UserLogin | undefined, action: Action) {
  return userReducer(state, action);
}