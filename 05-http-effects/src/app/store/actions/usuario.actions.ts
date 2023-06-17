import { createAction, props } from '@ngrx/store';
import { Usuario } from 'src/app/models/usuario.model';

export const cargarUsuario = createAction('[Usuarios] Cargar Usuario', props<{ id: string }>());

export const cargarUsuarioSuccess = createAction('[Usuario] Cargar Usuario Success', props<{ user: Usuario }>());

export const cargarUsuarioError = createAction('[Usuario] Cargar Usuario Error', props<{ payload: any }>());
