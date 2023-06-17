import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppStateWithIngresoEgreso } from '../ingreso-egreso.reducer';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import { IngresoEgresoService } from 'src/app/services/ingreso-egreso.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html'
})
export class DetalleComponent implements OnInit, OnDestroy {

  ingresosEgresos: IngresoEgreso[] = [];

  ingEgrSubs: Subscription;

  constructor(private store: Store<AppStateWithIngresoEgreso>, private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit(): void {
    this.ingEgrSubs = this.store.select('ingresosEgresos').subscribe(
      ({ items }) => this.ingresosEgresos = [...items]
    )
  }

  ngOnDestroy(): void {
      this.ingEgrSubs.unsubscribe();
  }

  borrar(uid: string): void {
    this.ingresoEgresoService.borrarIngresoEgreso(uid)
    .then(
      () => {
        Swal.fire({
          toast: true,
          icon: 'success',
          title: 'Item borrado exitosamente',
          position: 'bottom-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
      }
    )
    .catch((err) => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.message,
        showConfirmButton: true
      })
    })
  }

}
