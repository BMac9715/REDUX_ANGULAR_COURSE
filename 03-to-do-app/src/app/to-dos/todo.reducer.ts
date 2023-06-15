import { createReducer, on } from '@ngrx/store';
import { create, edit, remove, removeCompleted, toggle, toggleAll } from './todo.actions';
import { Todo } from './models/todo.models';

export const initialState: Todo[] = [
  new Todo('Salvar al mundo'),
  new Todo('Preparar el regalo para Cristy'),
  new Todo('Comprar Traje de Ironman')
];

const _todoReducer = createReducer(
  initialState,
  on(create, (state, { texto }) => [...state, new Todo( texto )]),
  on(toggle, (state, { id }) => { return state.map(x => { if(x.id === id) { return { ...x , completado: !x.completado }; } else { return x; } }); }),
  on(edit, (state, { id, texto }) => { return state.map(x => { if(x.id === id) { return { ...x , texto: texto }; } else { return x; } }); }),
  on(remove, (state, { id }) => state.filter(x => x.id !== id)),
  on(removeCompleted, (state) => state.filter(todo => !todo.completado)),
  on(toggleAll, (state, { valor }) => state.map(x => ({ ...x, completado: valor })))
);

export function todoReducer(state: any, action: any) {
  return _todoReducer(state, action);
}
