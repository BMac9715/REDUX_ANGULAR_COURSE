import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  user: Usuario;

  userSubs: Subscription;

  constructor(private authService: AuthService, private router: Router, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.userSubs = this.store.select('user').subscribe(
      ({user}) => {
        this.user = user;
      }
    );
  }

  ngOnDestroy(): void {
    this.userSubs.unsubscribe();
  }

  logout(): void {
    this.authService.logout()
      .then( () => {
        this.router.navigate(['/login']);
      });
  }
}
