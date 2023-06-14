import { createAction, props } from '@ngrx/store';

export const increment = createAction('[Counter] Increment');
export const decrement = createAction('[Counter] Decrement');
export const multiplicar = createAction('[Counter] Multiplicar', props<{ numero: number }>());
export const dividir = createAction('[Counter] Dividir', props<{ numero: number }>());

export const reset = createAction('[Counter] Reset');
