import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.redurcers';
import * as actions from '../contador.actions';

@Component({
  selector: 'app-hijo',
  templateUrl: './hijo.component.html',
  styleUrls: ['./hijo.component.scss']
})
export class HijoComponent {

  //@Input() contador: number;
  //@Output() cambioContador = new EventEmitter<number>();

  contador: number;

  constructor(private store: Store<AppState>) {

  }

  ngOnInit(): void {
    this.store.select('counter').subscribe(
      counter => {
        this.contador = counter;
      }
    )
  }

  multiplicar() {
    //this.contador *= 2;
    //this.cambioContador.emit(this.contador);

    this.store.dispatch( actions.multiplicar({ numero: 2 }) );
  }

  dividir() {
    //this.contador /= 2;
    //this.cambioContador.emit(this.contador);

    this.store.dispatch( actions.dividir({ numero: 2 }) );
  }

  /*
  resetNieto(nuevoContador: any) {
    //this.contador = nuevoContador;
    //this.cambioContador.emit(this.contador)
  }
  */

}
