import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, authState, signOut, Unsubscribe } from '@angular/fire/auth';
import { map } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { Firestore, addDoc, getDoc, collection, doc, onSnapshot, query, where, getDocs, setDoc } from '@angular/fire/firestore';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import * as authActions from '../auth/auth.actions';
import * as ingEgrActions from '../ingreso-egreso/ingreso-egreso.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userUnsubscribe!: Unsubscribe;
  private _user?: Usuario;

  constructor(private auth: Auth, private firestore: Firestore, private store: Store<AppState>) { }

  get user() {
    return { ...this._user };
  }

  initAuthListener() {
    authState(this.auth).subscribe( async fUser => {
      if(fUser) {
        this.userUnsubscribe = onSnapshot(
          doc(this.firestore, fUser.uid, 'user'),
          (docUser: any) => {
            let data: any = docUser.data();
            let user = Usuario.fromFirebase(data);
            this._user = user;
            this.store.dispatch(authActions.setUser({ user }));
          },
          (err => {
            console.log(err);
          })
        )
      }
      else {
        this._user = null;
        this.userUnsubscribe ? this.userUnsubscribe() : null;
        this.store.dispatch(authActions.unSetUser());
        this.store.dispatch(ingEgrActions.unSetItems());
      }
    });
  }

  crearUsuario(nombre: string, email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password).then(
      ({  user }) => {
          const newUser = new Usuario(user.uid, nombre, email);
          const userRef = doc(this.firestore, user.uid, 'user');

          return setDoc(userRef, { ...newUser });
      }
    );
  }

  loginUsuario(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth);
  }

  isAuth() {
    return authState(this.auth).pipe(
      map(fUser => fUser !== null)
    );
  }
}
