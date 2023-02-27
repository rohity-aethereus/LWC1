import { LightningElement, api, track, wire } from 'lwc';

export default class TodoApp extends LightningElement {
    @track todos = [
        { id: 1, title: 'Todo 1', done: false },
        { id: 2, title: 'Todo 2', done: false },
        { id: 3, title: 'Todo 3', done: false },
        { id: 4, title: 'Todo 4', done: false },
    ];

    newTodos = [];

    todoTitle = '';

    get todos() {
        return [...this.newTodos, ...this.todos];
    }


    handleAddTodo(event) {
        let newTodo = {
            id: this.todos.length + 1,
            title: this.todoTitle,
            done: false
        };

        this.newTodos = [...this.newTodos, newTodo];
    }

}