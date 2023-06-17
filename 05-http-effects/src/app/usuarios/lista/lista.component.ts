import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {

  usuarios: Usuario[] = [];

  constructor(public userService: UsuarioService) { }

  ngOnInit(): void {
    this.userService.getUser().subscribe(
      (data) => {
        this.usuarios = data;
      }
    )
  }

}