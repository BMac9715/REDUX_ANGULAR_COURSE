import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { cargarUsuarios, cargarUsuariosError, cargarUsuariosSuccess } from "../actions";
import { map, tap, mergeMap, catchError, of } from "rxjs";
import { UsuarioService } from "src/app/services/usuario.service";

@Injectable()
export class UsuariosEffects {
  constructor(private actions$: Actions, private usuariosService: UsuarioService) {}

  cargarUsuarios$ = createEffect(
    () => this.actions$.pipe(
                            ofType( cargarUsuarios ),
                            tap( data => console.log('effect tap ', data) ),
                            mergeMap(
                              () => this.usuariosService.getUser().pipe(
                                                                tap( data => console.log('getUsers effect ', data) ),
                                                                map( users => cargarUsuariosSuccess({ users }) ),
                                                                catchError( err => of(cargarUsuariosError({ payload: err })))
                                                              )
                            ))
  );
}
