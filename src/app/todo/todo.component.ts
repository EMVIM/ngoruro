import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  isEditing: boolean;
}

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  newTodoTitle: string = '';
  todos: Todo[] = [];
  filteredTodos: Todo[] = [];
  filter: 'all' | 'active' | 'completed' = 'all';

  get completedCount(): number {
    return this.todos.filter((todo: Todo) => todo.completed).length;
  }

  ngOnInit(): void {
    this.filterTodos('all');
  }

  saveTodo(): void {
    if (this.newTodoTitle.trim()) {
      const newTodo: Todo = {
        id: Date.now(),
        title: this.newTodoTitle.trim(),
        completed: false,
        isEditing: false,
      };
      this.todos.push(newTodo);
      this.filterTodos(this.filter);
      this.newTodoTitle = '';
    }
  }

  filterTodos(filter: 'all' | 'active' | 'completed'): void {
    this.filter = filter;
    if (filter === 'all') {
      this.filteredTodos = this.todos;
    } else if (filter === 'active') {
      this.filteredTodos = this.todos.filter(
        (todo): todo is Todo => !todo.completed
      );
    } else if (filter === 'completed') {
      this.filteredTodos = this.todos.filter(
        (todo): todo is Todo => todo.completed
      );
    }
  }

  toggleTodoCompletion(id: number): void {
    const todo = this.todos.find((todo: Todo) => todo.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      this.filterTodos(this.filter);
    }
  }

  editTodo(id: number): void {
    const todo = this.todos.find((todo: Todo) => todo.id === id);
    if (todo) {
      todo.isEditing = true;
    }
  }

  saveEditedTodo(id: number): void {
    const todo = this.todos.find((todo: Todo) => todo.id === id);
    if (todo) {
      todo.isEditing = false;
    }
  }

  deleteTodo(id: number): void {
    this.todos = this.todos.filter((todo: Todo) => todo.id !== id);
    this.filterTodos(this.filter);
  }

  toggleAllTodos(): void {
    const allCompleted = this.todos.every((todo: Todo) => todo.completed);
    this.todos.forEach((todo: Todo) => (todo.completed = !allCompleted));
    this.filterTodos(this.filter);
  }

  clearCompletedTodos(): void {
    this.todos = this.todos.filter((todo): todo is Todo => !todo.completed);
    this.filterTodos(this.filter);
  }
}
