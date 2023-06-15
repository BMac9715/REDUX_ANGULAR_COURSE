import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Todo } from '../models/todo.models';
import { FormControl, Validators } from '@angular/forms';
import { AppState } from 'src/app/app.reducer';
import { edit, remove, toggle } from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() todo: Todo;
  @ViewChild('inputItem') txtInputItem: ElementRef;

  chkCompletado: FormControl;
  txtInput: FormControl;

  editando: boolean = false;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.chkCompletado = new FormControl(this.todo.completado);
    this.txtInput = new FormControl(this.todo.texto, Validators.required);

    this.chkCompletado.valueChanges.subscribe( valor => {
      this.store.dispatch(toggle({ id: this.todo.id }));
    });
  }

  editar(): void {
    this.editando = true;

    setTimeout(() => {
      this.txtInputItem.nativeElement.select();
    }, 10);
  }

  borrar(): void {
    this.store.dispatch( remove({id: this.todo.id}) );
  }

  terminarEdicion(): void {
    this.editando = false;

    if( this.txtInput.invalid ) { return; }

    if( this.txtInput.value === this.todo.texto ) { return; }

    this.store.dispatch(edit({ id: this.todo.id, texto: this.txtInput.value }));
  }

}
