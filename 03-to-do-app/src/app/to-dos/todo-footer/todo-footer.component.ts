import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { filtrosValidos, setFiltro } from 'src/app/filtro/filtro.actions';
//import { Todo } from '../models/todo.models';
import { remove, removeCompleted } from '../todo.actions';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.css']
})
export class TodoFooterComponent implements OnInit {

  filtroActual: filtrosValidos = 'all';
  filtros: filtrosValidos[] = ['all', 'completed', 'pending'];

  pendientes: number = 0;
  //completados: Todo[] = [];

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    //this.store.select('filtro').subscribe( filtro => {
    //  this.filtroActual = filtro;
    //});

    this.store.subscribe(state => {
      this.filtroActual = state.filtro;

      this.pendientes = state.todos.filter(todo => !todo.completado).length;

      //this.completados = state.todos.filter(todo => todo.completado);
    });
  }

  cambiarFiltro(filtro: filtrosValidos): void {
    this.store.dispatch( setFiltro({ filtro }) );
  }

  limpiarCompletados() {
    //for (const item of this.completados) {
    //  this.store.dispatch( remove({ id: item.id }) );
    //}

    this.store.dispatch( removeCompleted() );
  }
}
