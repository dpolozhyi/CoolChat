import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { Router, ActivatedRoute }   from '@angular/router';
import { ChatService } from '../shared/services/chat.service';
import { AuthService } from '../shared/services/auth.service';

import { ChatRoomModel } from '../shared/models/chatroom.model';
import { LoginModel } from '../shared/models/login.model';
import { RegisterModel } from '../shared/models/register.model';

enum AuthState {
    Login,
    Register,
    None
}

enum FieldStatus {
    Undefined = 0,
    Wrong = 1,
    Satisfied = 2,
    Good = 3
}

@Component({
    selector: 'div[auth]',
    templateUrl: 'app/auth/auth.component.html',
    styleUrls: ['app/auth/auth.component.css']
})
export class AuthComponent {
    private logged: boolean = false;

    authState: any = AuthState;

    fieldType: any = FieldStatus;

    private loading: boolean = false;

    private state: AuthState = AuthState.Login;

    private passStatus: FieldStatus = FieldStatus.Undefined;

    private loginModel: LoginModel = new LoginModel();

    private registerModel: RegisterModel = new RegisterModel();

    private name: string;

    private failedLogin: boolean = false;

    constructor(private router: Router, route: ActivatedRoute, private authService: AuthService) {
        if (route.snapshot.data['isRegistration']) {
            this.state = AuthState.Register;
        }
    }

    toLogin() {
        this.router.navigate(['login']);
    }

    toRegister() {
        this.router.navigate(['register']);
    }

    onLogin() {
        this.loading = true;
        this.authService.getToken(this.loginModel).then(token => {
            console.log(token);
            this.loading = false;
            this.router.navigate(['']);
        }, err => {
            this.failedLogin = true;
            this.loading = false;
        });
    }

    onRegister() {
        console.log(this.registerModel);
        this.authService.registerUser(this.registerModel).then(res => console.log(res));
    }

    onPasswordEnter(value: string) {
        if (value.length < 6 || !value.match(/\d+/g)) {
            this.passStatus = FieldStatus.Wrong;
            return;
        }
        if (!this.IsContainUpperLetter(value)) {
            this.passStatus = FieldStatus.Satisfied;
            return;
        }
        this.passStatus = FieldStatus.Good;
    }

    private IsContainUpperLetter(string: any) {
        var i = 0;
        var character = '';
        while (i < string.length) {
            character = string.charAt(i++);
            if (!character.match(/\d+/g) && character == character.toUpperCase()) {
                return true;
            }     
        }
        return false;
    }
}