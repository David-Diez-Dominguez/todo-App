import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {NewTodoComponent} from './new-todo/new-todo.component';
import {NewGroupComponent} from './new-group/new-group.component';
import {ConfirmDeleteComponent} from "./confirm-delete/confirm-delete.component";

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'new/todo', component: NewTodoComponent},
  {path: 'new/group', component: NewGroupComponent},
  {path: 'delete', component: ConfirmDeleteComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
