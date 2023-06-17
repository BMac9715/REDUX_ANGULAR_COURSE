import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, tap, take } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.isAuth().pipe(tap( estado => {
      if( !estado ){ this.router.navigate(['/login']); }
    }),
    take(1)
    );
  }

  canLoad(): Observable<boolean> {
    return this.authService.isAuth().pipe(tap( estado => {
      if( !estado ){ this.router.navigate(['/login']); }
    }));
  }

}
