import { Action, createReducer, on } from "@ngrx/store";
import { decrement, dividir, increment, multiplicar, reset } from "./contador.actions";

/*
export function counterReducer(state: number = 10, action: Action) {
  switch (action.type) {
    case increment.type:
      return state + 1;
    case decrement.type:
      return state - 1;
    case reset.type:
      return 0;
    default:
      return state;
  }
}
*/

export const initialState = 10;

export const _counterReducer = createReducer(
  initialState,
  on(increment, (state) => state + 1),
  on(decrement, (state) => state - 1),
  on(multiplicar, (state, { numero }) => state * numero),
  on(dividir, (state, { numero }) => state / numero),
  on(reset, (state) => 0)
);

export function counterReducer(state: any, action: Action) {
  return _counterReducer(state, action)
}
