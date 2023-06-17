import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html'
})
export class EstadisticaComponent implements OnInit, OnDestroy {

  ingresos: number = 0;
  egresos: number = 0;

  totalIngresos: number = 0;
  totalEgresos: number = 0;

  ingEgrSubs: Subscription;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
     this.ingEgrSubs = this.store.select('ingresosEgresos').subscribe(
      ({items}) => this.generarEstadistica(items)
    )
  }

  ngOnDestroy(): void {
    this.ingEgrSubs.unsubscribe();
  }

  generarEstadistica(items: IngresoEgreso[]) {
    this.totalIngresos = 0;
    this.totalEgresos = 0;
    this.ingresos = 0;
    this.egresos = 0;

    for(const item of items) {
      if(item.tipo === 'ingreso') {
        this.totalIngresos += item.monto;
        this.ingresos ++;
      }
      else {
        this.totalEgresos += item.monto;
        this.egresos ++;
      }
    }
  }

}
