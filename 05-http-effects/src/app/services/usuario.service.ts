import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private _base_url = 'https://reqres.in/api';

  constructor(private http: HttpClient) { }

  getUser() {
    return this.http.get(`${this._base_url}/users?per_page=6`).pipe(map(res => res['data']));
  }

  getUserByID( id: string ) {
    return this.http.get(`${this._base_url}/users/${id}`).pipe(map(res => res['data']));
  }
}
