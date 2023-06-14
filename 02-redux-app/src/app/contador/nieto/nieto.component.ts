import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.redurcers';
import { reset } from '../contador.actions';

@Component({
  selector: 'app-nieto',
  templateUrl: './nieto.component.html',
  styleUrls: ['./nieto.component.scss']
})
export class NietoComponent {

  //@Input() contador: number;
  //@Output() cambioContador = new EventEmitter<number>();

  contador: number;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.select('counter').subscribe(
      (counter) => {
        this.contador = counter
      }
    )
  }

  reset() {
    //this.contador = 0;
    //this.cambioContador.emit(0);

    this.store.dispatch( reset() );
  }

}
