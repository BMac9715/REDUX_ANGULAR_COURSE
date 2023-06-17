import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionSnapshots, collectionChanges, doc, deleteDoc } from '@angular/fire/firestore';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { AuthService } from './auth.service';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(private firestore: Firestore, private authService: AuthService) { }

  crearIngresoEgreso( ingresoEgreso: IngresoEgreso) {
    const uid = this.authService.user?.uid;
    const collectionInstance = collection(
      this.firestore,
      `${uid}`,
      'ingresos-egresos',
      'items'
    );

    return addDoc(collectionInstance, { ...ingresoEgreso })
  }

  initIngresosEgresos(uid: string) {
    return collectionSnapshots(
      collection(this.firestore, uid, 'ingresos-egresos/items')
    )
      .pipe(
          map((items) =>
              items.map((item) => {
                  const data = item.data();
                  const uid = `${item.id}`;
                  return { uid, ...data };
              })
          ),
          //tap(items => console.log(items)),
      );
  }

  borrarIngresoEgreso( uidItem: string) {
    const uidUser = this.authService.user?.uid;

    return deleteDoc(doc(this.firestore, `${uidUser}/ingresos-egresos/items`, uidItem))
  }
}
