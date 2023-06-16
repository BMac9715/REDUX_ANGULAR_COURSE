import { createReducer, on } from '@ngrx/store';
import * as user from './auth.actions';
import { Usuario } from '../models/usuario.model';


export interface State {
  user: Usuario;
}

export const initialState: State = {
  user: null
};

const _authReducer = createReducer(
  initialState,
  on(user.setUser, (state, { user }) => ({ ...state, user: { ...user } })),
  on(user.unSetUser, (state) => ({ ...state, user: null })),
);

export function authReducer(state: any, action: any) {
  return _authReducer(state, action);
}
