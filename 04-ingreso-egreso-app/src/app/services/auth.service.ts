import { Injectable } from '@angular/core';
import { Auth, UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Observable, map } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth, private firestore: Firestore) { }

  initAuthListener() {
    return this.auth.beforeAuthStateChanged(fuser => {
      if(fuser) {

      }
    });
  }

  crearUsuario(nombre: string, email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password).then(
      ({  user }) => {
          const newUser = new Usuario(user.uid, nombre, email);
          const userRef = collection(this.firestore, 'user');

          return addDoc(userRef, { ...newUser });
      }
    );
  }

  loginUsuario(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  isAuth() {
    return new Observable( subscriber => {
      const unsubscribe = this.auth.onAuthStateChanged(subscriber);

      return { unsubscribe }
    }).pipe( map( fbUser => fbUser != null) );
  }
}
