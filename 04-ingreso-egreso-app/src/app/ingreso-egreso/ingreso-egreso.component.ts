import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { isLoading, stopLoading } from '../shared/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html'
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  ingresoForm: FormGroup;
  tipo: string ='ingreso';
  loading: boolean = false;

  loadingSubscription: Subscription

  constructor(private fb: FormBuilder,
              private ingresoEgresoService: IngresoEgresoService,
              private store: Store<AppState>) { }

  ngOnInit(): void {
    this.ingresoForm = this.fb.group({
      descripcion: ['', [Validators.required]],
      monto: [0, [Validators.required]]
    });

    this.loadingSubscription = this.store.select('ui').subscribe(
      ({ isLoading }) => {
        this.loading = isLoading;
      }
    );
  }

  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe();
  }

  guardar(): void {
    if(this.ingresoForm.invalid) { return; }

    this.store.dispatch( isLoading() );

    const { descripcion, monto } = this.ingresoForm.value

    const ingresoEgreso = new IngresoEgreso(descripcion, monto, this.tipo);

    this.ingresoEgresoService.crearIngresoEgreso( ingresoEgreso )
    .then( () => {
      this.ingresoForm.reset();
      this.store.dispatch( stopLoading() );
      Swal.fire('Registro creado', descripcion, 'success');
    })
    .catch((err) => {
      this.store.dispatch( stopLoading() );
      Swal.fire('Error', err.message, 'error')
    });
  }

}
