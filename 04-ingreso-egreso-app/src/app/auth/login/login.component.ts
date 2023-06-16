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
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  loading: boolean = false;

  uiSubscription: Subscription;

  constructor(private fb: FormBuilder, private authService: AuthService,
    private router: Router, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    this.uiSubscription = this.store.select('ui').subscribe( ui => {
      this.loading = ui.isLoading;
    });
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  login(): void {
    if(this.loginForm.invalid) { return; }

    //Loading
    this.store.dispatch( ui.isLoading() );

    //Swal.fire({
    //  title: 'Waiting for...',
    //  didOpen: () => {
    //    Swal.showLoading()
    //  }
    //});

    const { email, password } = this.loginForm.value;

    this.authService.loginUsuario(email, password)
    .then( res => {
      console.log(res);
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
