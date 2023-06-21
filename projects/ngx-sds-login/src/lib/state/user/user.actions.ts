// user/user.actions.ts
import { createAction, props } from '@ngrx/store';
import { UserLogin } from '../../models/azure';



export const createUser = createAction('[User] Create User', props<{payload: UserLogin}>());
export const modifyUser = createAction('[User] Modify User', props<{payload: UserLogin}>());
export const resetUser = createAction('[User] Reset User');
