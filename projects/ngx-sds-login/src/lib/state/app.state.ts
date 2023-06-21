// app.state.ts

import { Menu, UserLogin } from "../models/azure";



export interface AppState {
  actividad: Menu;
  menu: Menu[];
  user: UserLogin;
  
  //menuGuard: string[];
}