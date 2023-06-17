import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { cargarUsuario, cargarUsuarioError, cargarUsuarioSuccess, cargarUsuariosError, cargarUsuariosSuccess } from "../actions";
import { map, tap, mergeMap, catchError, of } from "rxjs";
import { UsuarioService } from "src/app/services/usuario.service";

@Injectable()
export class UsuarioEffects {
  constructor(private actions$: Actions, private usuariosService: UsuarioService) {}

  cargarUsuario$ = createEffect(
    () => this.actions$.pipe(
                            ofType( cargarUsuario ),
                            tap( data => console.log('effect tap ', data) ),
                            mergeMap(
                              ( action ) => this.usuariosService.getUserByID( action.id ).pipe(
                                                                tap( data => console.log('getUserByID effect ', data) ),
                                                                map( user => cargarUsuarioSuccess({ user }) ),
                                                                catchError( err => of(cargarUsuarioError({ payload: err })))
                                                              )
                            ))
  );
}
