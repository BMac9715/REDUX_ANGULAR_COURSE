import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';
//import { UsuarioService } from 'src/app/services/usuario.service';
import { cargarUsuarios } from 'src/app/store/actions';
import { AppState } from 'src/app/store/app.reducers';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit, OnDestroy {

  usuarios: Usuario[] = [];
  loading: boolean = false;
  error: any;

  usersSubs: Subscription;

  constructor(
    //public userService: UsuarioService
    private store:Store<AppState>
    ) { }

  ngOnInit(): void {
    //Sera reemplazado por los "Effects"
    //this.userService.getUser().subscribe(
    //  (data) => {
    //    this.usuarios = data;
    //  }
    //)

    this.usersSubs = this.store.select('usuarios').subscribe(
      ({users, loading, error}) => {
        this.usuarios = users;
        this.loading = loading;
        this.error = error;
      }
    );

    this.store.dispatch( cargarUsuarios() );
  }

  ngOnDestroy(): void {
    this.usersSubs?.unsubscribe();
  }

}
