import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
//import { decrement, increment } from './contador/contador.actions';
import * as actions from './contador/contador.actions';
import { AppState } from './app.redurcers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  contador: number;

  constructor(private store: Store<AppState>) {
    //this.contador = 10;

    /*this.store.subscribe(
      state => {
        console.log(state);
        this.contador = state.counter;
      }
    )*/

    this.store.select('counter').subscribe(
      counter => {
        this.contador = counter;
      }
    )
  }

  incrementar() {
    //this.contador++;

    this.store.dispatch( actions.increment() );
  }

  decrementar() {
    //this.contador--;

    this.store.dispatch( actions.decrement() );
  }
}
