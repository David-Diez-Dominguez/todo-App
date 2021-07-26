import {Component, EventEmitter, Output} from '@angular/core';
import {MatDialog} from '@angular/material';
import {NewTodoComponent} from './new-todo/new-todo.component';
import { FirebaseService } from './services/firebase.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'firebase-angular-auth';
  isSignedIn = false
  

  @Output() isLogout = new EventEmitter<void>()
  constructor(private dialog: MatDialog, public firebaseService : FirebaseService) {
  }
  ngOnInit(){
    if(localStorage.getItem('user')!== null)
    this.isSignedIn= true
    else
    this.isSignedIn = false
  }
  async onSignup(email:string,password:string){
    await this.firebaseService.signup(email,password)
    if(this.firebaseService.isLoggedIn)
    this.isSignedIn = true
    
  }
  async onSignin(email:string,password:string){
    await this.firebaseService.signin(email,password)
    if(this.firebaseService.isLoggedIn)
    this.isSignedIn = true
  }

  logout(){
    this.firebaseService.logout()
    this.isLogout.emit()
    window.location.href=""
  }

  handleLogout(){
    this.isSignedIn = false
  }
  onCreate() {
    this.dialog.open(NewTodoComponent, {width: '400px', height: '450px', data: []});
  }
}
