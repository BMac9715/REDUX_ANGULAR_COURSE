import { ActionReducerMap } from '@ngrx/store';
import { Todo } from "./to-dos/models/todo.models";
import { todoReducer } from './to-dos/todo.reducer';
import { filtrosValidos } from './filtro/filtro.actions';
import { filtroReducer } from './filtro/filtro.reducer';

export interface AppState {
  todos: Todo[],
  filtro: filtrosValidos
}

export const appReducers: ActionReducerMap<AppState> = {
    todos: todoReducer,
    filtro: filtroReducer
}

