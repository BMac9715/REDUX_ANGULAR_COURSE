import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../models/todo.models';
import { filtrosValidos } from 'src/app/filtro/filtro.actions';

@Pipe({
  name: 'filtroTodo'
})
export class FiltroPipe implements PipeTransform {

  transform(todos: Todo[], filtro: filtrosValidos): Todo[] {
    switch (filtro) {
      case 'completed':
        return todos.filter(todo => todo.completado);
      case 'pending':
        return todos.filter(todo => !todo.completado);
      default:
        return todos;
    }
  }

}
