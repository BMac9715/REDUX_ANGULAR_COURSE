import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/app.reducer';
import { toggleAll } from '../todo.actions';

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.css']
})
export class TodoPageComponent implements OnInit {

  chkToggleAll: FormControl;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.chkToggleAll = new FormControl(false);

    this.chkToggleAll.valueChanges.subscribe( valor => {
      this.store.dispatch( toggleAll({ valor: valor }) );
    })
  }

}
