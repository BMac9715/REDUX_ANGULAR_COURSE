import { createAction, props } from '@ngrx/store';

export const create = createAction('[TODO] Create ToDo', props<{ texto: string }>());

export const toggle = createAction('[TODO] Toggle ToDo', props<{ id: number }>());

export const toggleAll = createAction('[TODO] Toggle All ToDo', props<{ valor: boolean }>());

export const edit = createAction('[TODO] Edit ToDo', props<{ id: number, texto: string }>());

export const remove = createAction('[TODO] Delete ToDo', props<{ id: number }>());

export const removeCompleted = createAction('[TODO] Delete ToDo Completed');
