import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';
import { cargarUsuario } from 'src/app/store/actions';
import { AppState } from 'src/app/store/app.reducers';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html'
})
export class UsuarioComponent implements OnInit, OnDestroy {

  usuario: Usuario;
  loading: boolean;
  error: any;

  userSubs: Subscription;

  constructor(private router: ActivatedRoute, private store: Store<AppState>) { }

  ngOnInit(): void {

    this.userSubs = this.store.select('usuario').subscribe(
      ({ user, loading, error }) => {
        this.usuario = { ...user };
        this.loading = loading;
        this.error = error;
      }
    );

    this.router.params.subscribe(({ id }) => {
      this.store.dispatch( cargarUsuario({ id }));
    });
  }

  ngOnDestroy(): void {
    this.userSubs.unsubscribe();
  }
}
