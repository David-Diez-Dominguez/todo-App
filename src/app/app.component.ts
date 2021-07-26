import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatDialog} from '@angular/material';
import {NewTodoComponent} from './new-todo/new-todo.component';
import {FirebaseService} from "./services/firebase.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'firebase-angular-auth';
    isSignedIn = false

    @Output() isLogout = new EventEmitter<void>()
    constructor(private dialog: MatDialog, public firebaseService: FirebaseService) {
    }

    ngOnInit() {
        this.isSignedIn = localStorage.getItem('user') !== null;
    }

    onCreate() {
        this.dialog.open(NewTodoComponent, {width: '400px', height: '450px', data: []});
    }

    async onSignup(email: string, password: string) {
        await this.firebaseService.signup(email, password)
        if (this.firebaseService.isLoggedIn)
            this.isSignedIn = true
    }

    async onSignin(email: string, password: string) {
        await this.firebaseService.signin(email, password)
        if (this.firebaseService.isLoggedIn)
            this.isSignedIn = true
    }

    handleLogout() {
        this.isSignedIn = false;
    }

    logout() {
        this.firebaseService.logout();
        this.isLogout.emit();
        window.location.href = "";
    }
}
