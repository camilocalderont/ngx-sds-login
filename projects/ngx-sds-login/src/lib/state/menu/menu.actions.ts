// menu/menu.actions.ts
import { createAction, props } from '@ngrx/store';
import { Menu } from '../../models/azure';



export const createMenu = createAction('[Menu] Create Menu', props<{payload: Menu[]}>());
export const modifyMenu = createAction('[Menu] Modify Menu', props<{payload: Menu[]}>());
export const resetMenu = createAction('[Menu] Reset Menu');
