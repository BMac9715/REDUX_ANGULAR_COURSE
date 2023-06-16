import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';
import * as ui from 'src/app/shared/ui.actions';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit, OnDestroy {

  registroForm: FormGroup;
  loading: boolean = false;

  uiSubscription: Subscription;

  constructor(private fb: FormBuilder, private authService: AuthService,
    private router: Router, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      nombre: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    this.uiSubscription = this.store.select('ui').subscribe( ui => {
      this.loading = ui.isLoading;
    });
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  crearUsuario() {
    if(this.registroForm.invalid) { return; }

    //Loading
    this.store.dispatch( ui.isLoading() );

    //Swal.fire({
    //  title: 'Waiting for...',
    //  didOpen: () => {
    //    Swal.showLoading()
    //  }
    //});

    const { nombre, correo, password } = this.registroForm.value;

    this.authService.crearUsuario(nombre, correo, password)
      .then( credenciales => {
        //console.log(credenciales);
        this.store.dispatch( ui.stopLoading() );
        //Swal.close();
        this.router.navigate(['/']);
      })
      .catch( err => {
        console.error(err);
        this.store.dispatch( ui.stopLoading() );
        //Swal.fire({
        //  icon: 'error',
        //  title: 'Oops...',
        //  text: err.message
        //});
      });
  }

}
