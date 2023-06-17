import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { Subscription, filter } from 'rxjs';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { setItems } from '../ingreso-egreso/ingreso-egreso.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit, OnDestroy {

  userSubs: Subscription;
  ingEgSubs: Subscription;

  constructor(private store:Store<AppState>, private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit(): void {
    this.userSubs = this.store.select('user')
      .pipe(
        filter( auth => auth.user != null )
      )
      .subscribe(
        ({user}) => {
          console.log(user);
           this.ingEgSubs = this.ingresoEgresoService.initIngresosEgresos(user.uid)
          .subscribe( (items:any) => {
            this.store.dispatch( setItems({ items: items}) )
          });
        }
      );
  }

  ngOnDestroy(): void {
    this.ingEgSubs?.unsubscribe();
    this.userSubs?.unsubscribe();
  }
}
