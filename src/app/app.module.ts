
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatNativeDateModule,
} from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';


import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { ApiService } from './api.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { NewTodoComponent } from './new-todo/new-todo.component';
import { NewGroupComponent } from './new-group/new-group.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from "@angular/material/expansion";
import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';
import { AngularFireModule } from '@angular/fire';
import { HomeComponent } from './home/home.component';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireAuthModule } from '@angular/fire/auth';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NewTodoComponent,
    NewGroupComponent,
    ConfirmDeleteComponent,
    DashboardComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatListModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    MatExpansionModule,
    MatDialogModule,
    MatDatepickerModule,
    AngularFireAuthModule,
    MatNativeDateModule,
    AngularFireModule.initializeApp(
      {
        apiKey: "AIzaSyCU9b246bR3KWR0kjJH9Avi4QDr_acGjig",
        authDomain: "todoapp-2021-6e05e.firebaseapp.com",
        projectId: "todoapp-2021-6e05e",
        storageBucket: "todoapp-2021-6e05e.appspot.com",
        messagingSenderId: "57121209066",
        appId: "1:57121209066:web:e20b15066124ce2c06f593"
      }
    )



  ],
  providers: [ApiService, MatNativeDateModule, AngularFireAuth ],
  bootstrap: [AppComponent]
})
export class AppModule { }
