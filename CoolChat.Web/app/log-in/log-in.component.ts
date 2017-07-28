import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { ChatService } from '../shared/services/chat.service';

import { ChatRoomModel } from '../shared/models/chatroom.model';

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
    selector: 'div[log-in]',
    templateUrl: 'app/log-in/log-in.component.html',
    styleUrls: ['app/log-in/log-in.component.css']
})
export class LogInComponent {
    private logged: boolean = false;

    authState: any = AuthState;

    fieldType: any = FieldStatus;

    private loading: boolean = false;

    private state: AuthState = AuthState.Login;

    private passStatus: FieldStatus = FieldStatus.Undefined;

    onRegister() {
        this.state = AuthState.Register;
    }

    onLogin() {
        this.loading = true;
        setTimeout(() => this.loading = false, 3000);
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