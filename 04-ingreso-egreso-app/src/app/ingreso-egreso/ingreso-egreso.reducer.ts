import { createReducer, on } from '@ngrx/store';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import * as actions from './ingreso-egreso.actions';
import { AppState } from '../app.reducer';


export interface State {
  items: IngresoEgreso[];
}

export interface AppStateWithIngresoEgreso extends AppState {
  ingresosEgresos: State
}

export const initialState: State = {
  items: []
};

const _ingresoEgresoReducer = createReducer(
  initialState,
  on(actions.setItems, (state, { items }) => ({ ...state, items: [...items] })),
  on(actions.unSetItems, (state) => ({ ...state, items: [] })),
);

export function ingresoEgresoReducer(state: any, action: any) {
  return _ingresoEgresoReducer(state, action);
}
