import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  user: Usuario;

  userSubs: Subscription;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.userSubs = this.store.select('user').subscribe(
      ({ user }) => {
        this.user = user;
      }
    )
  }

  ngOnDestroy(): void {
    this.userSubs.unsubscribe();
  }

}
