import { HttpClient } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { environment } from '../environments/environment';

export interface ToDo {
  id: string;
  title: string;
  description: string;
  author: string;
  completed: boolean;
  groupId: string;
  expirationDate: string;
}
export interface Group {
  groupId: string;
  name: string;
  color: string;
}
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url = environment.backendUrl;

  constructor(private http: HttpClient) {
  }

  /**
   * Returns an array with all ToDos.
   * @return {@link ToDo}[] - Array with all to-dos in mongodb.
   */
  getTodos() {
    return this.http.get<ToDo[]>(this.url + 'todo/all').toPromise();
  }

  /**
   * Calls post method to save given to-do.
   * @param todo {@link ToDo} - The to-do to save.
   */
  saveTodo(todo: ToDo) {
    this.http.post<ToDo>(this.url + 'todo', todo).toPromise();
  }

  /**
   * Calls post method to create a new to-do with given parameters in mongodb.
   * @param title string - title of to-do
   * @param description string - description of to-do
   * @param author string - author of to-do
   * @param groupId string - the group id of the belonging group.
   * @param expirationDate string - the date of expiration for the to-do
   * @see Group
   */
  createTodo(title: string, description: string, author: string, groupId: string, expirationDate: string) {
    this.http.post<String[]>(this.url + 'todo/new', [title, description, author, groupId, expirationDate]).toPromise();
  }

  /**
   * Calls delete method to delete given to-do
   * @param todo {@link ToDo} - the to-do to delete
   */
  deleteTodo(todo: ToDo) {
    this.http.delete(this.url + 'todo/delete/' + todo.id).toPromise();
  }

  /**
   * Returns an array with all groups in the mongodb.
   * @return {@link Group}[] - Array of all groups in mongodb.
   */
  getGroups() {
    return this.http.get<Group[]>(this.url + 'group/all').toPromise();
  }

  /**
   * Calls post method to save the given group.
   * @param group {@link Group} - Group to save.
   */
  saveGroup(group: Group) {
    this.http.post<Group>(this.url + 'group', group).toPromise();
  }

  /**
   * Calls post method to create a new group with given parameters.
   * @param name string - name of group.
   * @param color string - color of group.
   */
  createGroup(name: string, color: string) {
    this.http.post<String[]>(this.url + 'group/new', [name, color]).toPromise();
  }

  /**
   * Calls delete method to delete given group in the mongodb.
   * @param group {@link Group} - the group to delete.
   */
  deleteGroup(group: Group) {
    this.http.delete(this.url + 'group/delete/' + group.groupId).toPromise();
  }
}
