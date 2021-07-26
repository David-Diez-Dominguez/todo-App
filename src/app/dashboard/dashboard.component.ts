import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ApiService, Group, ToDo} from '../api.service';
import {MatDialog} from '@angular/material/dialog';
import {NewGroupComponent} from '../new-group/new-group.component';
import {NewTodoComponent} from "../new-todo/new-todo.component";
import {ConfirmDeleteComponent} from "../confirm-delete/confirm-delete.component";
import {FirebaseService} from "../services/firebase.service";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    groups: Group[];
    selectedGroups: Group[];
    todos: ToDo[];
    listedTodos: ToDo[];

    dropdownActivated: boolean;

    @Output() isLogout = new EventEmitter<void>()

    constructor(private apiService: ApiService, private dialog: MatDialog,  public firebaseService: FirebaseService) {
        this.dropdownActivated = false
        this.selectedGroups = [];
    }

    async ngOnInit() {
        this.groups = await this.apiService.getGroups();
        this.todos = await this.apiService.getTodos();
        this.selectedGroups = this.groups;
        this.updateTodos();
    }

    checked(todo: ToDo) {
        todo.completed = !todo.completed;
        this.updateTodos();
        this.apiService.saveTodo(todo);
        this.dropdownActivated = false;
    }

    updateTodos() {
        if (this.selectedGroups.length == 0) {
            this.listedTodos = this.todos;
        } else {
            this.listedTodos = this.todos.filter(value => this.isInGroupSelection(value.groupId));
        }
    }

    editTodo(todo: ToDo) {
        this.dialog.open(NewTodoComponent, {width: '400px', height: '450px', data: [null, null, todo]});
    }

    delete(todo: ToDo): void {
        let confirmDelete = this.dialog.open(ConfirmDeleteComponent);
        confirmDelete.afterClosed().subscribe(result => {
            if (result) {
                this.todos = this.todos.filter((value) => value !== todo);
                this.updateTodos();
                this.apiService.deleteTodo(todo);
            }
        });
    }

    openGroupDialog(group: Group) {
        this.dialog.open(NewGroupComponent, {width: '400px', height: '300px', data: group});
    }

    isInGroupSelection(groupId: any) {
        return this.selectedGroups.filter(value => groupId === value.groupId).length > 0;
    }

    updateGroupSelection(group: Group) {
        if (this.isInGroupSelection(group.groupId)) {
            this.selectedGroups = this.selectedGroups.filter(value => value.groupId !== group.groupId);
        } else {
            this.selectedGroups.push(group);
        }
        this.updateTodos();
    }

    createTodo(group: Group) {
        this.dialog.open(NewTodoComponent, {width: '400px', height: '450px', data: [group]});
    }

    createTodoWithTitle() {
        const title = (document.getElementById('todo-add-new-title') as HTMLInputElement).value;
        this.dialog.open(NewTodoComponent, {width: '400px', height: '450px', data: [null, title]});
    }

    getGroupTodos(group: Group) {
        return this.todos.filter(value => value.groupId === group.groupId);
    }

    logout() {
        this.firebaseService.logout()
        this.isLogout.emit()
    }

}
