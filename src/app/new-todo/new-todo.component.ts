import {Component, Inject, OnInit} from '@angular/core';
import {ApiService, Group, ToDo} from '../api.service';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material";

@Component({
  selector: 'app-new-todo',
  templateUrl: './new-todo.component.html',
  styleUrls: ['../popup-data.component.scss']
})
export class NewTodoComponent implements OnInit {

  group: Group;
  title: any;
  oldTodo: ToDo;
  groups: Group[];
  submitPressed: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private apiService: ApiService, public dialog: MatDialog) {
    this.group = null;
    this.title = null;
    this.oldTodo = null;
    if (data.length == 1) {
      this.group = data[0]
    } else if (data.length == 2) {
      this.title = data[1];
    } else if (data.length == 3) {
      this.oldTodo = data[2];
    }
  }

  async ngOnInit() {
    this.submitPressed = false;
    this.groups = await this.apiService.getGroups();
    if (this.title !== null) {
      (document.getElementById('newTitle') as HTMLInputElement).value = this.title;
    } else if (this.oldTodo !== null) {
      (document.getElementById('title-text') as HTMLInputElement).innerHTML = 'Update this ToDo';
      (document.getElementById('newTitle') as HTMLInputElement).value = this.oldTodo.title;
      (document.getElementById('newDescription') as HTMLInputElement).value = this.oldTodo.description;
      (document.getElementById('newAuthor') as HTMLInputElement).value = this.oldTodo.author;
      (document.getElementById('newExpirationDate') as HTMLInputElement).value = this.oldTodo.expirationDate;
      this.group = this.groups.filter(value => value.groupId == this.oldTodo.groupId)[0];
    }
    if (this.group !== null) {
      this.groups = this.groups.sort(a => {
        if (a.groupId === this.group.groupId)
          return -1;
        else
          return 1;
      });
    }
  }

  submit() {
    if (this.submitPressed) {
      return;
    }
    const title = (document.getElementById('newTitle') as HTMLInputElement).value;
    if (title === '') {
      const label = document.getElementById('newTitleLabel');
      label.style.color = 'RED';
      return;
    }

    const description = (document.getElementById('newDescription') as HTMLInputElement).value;
    const author = (document.getElementById('newAuthor') as HTMLInputElement).value;
    const groupId = (document.getElementById('selectedGroup') as HTMLInputElement).value;
    const expirationDate = (document.getElementById('newExpirationDate') as HTMLInputElement).value;

    this.submitPressed = true;
    if (this.oldTodo === null) {
      this.apiService.createTodo(title, description, author, groupId, expirationDate);
      window.location.href = 'http://localhost:4200';
    } else {
      this.oldTodo.title = title;
      this.oldTodo.description = description;
      this.oldTodo.author = author;
      this.oldTodo.groupId = groupId;
      this.oldTodo.expirationDate = expirationDate;
      this.apiService.saveTodo(this.oldTodo);
      this.dialog.ngOnDestroy();
    }
  }

  deleteTodo() {
    this.apiService.deleteTodo(this.oldTodo);
    window.location.href = 'http://localhost:4200';
  }
}
