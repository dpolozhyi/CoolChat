import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { ChatService } from '../shared/services/chat.service';

import { ChatRoomModel } from '../shared/models/chatroom.model';

enum AuthState {
    Login,
    Register,
    None
}

@Component({
    selector: 'div[log-in]',
    templateUrl: 'app/log-in/log-in.component.html',
    styleUrls: ['app/log-in/log-in.component.css']
})
export class LogInComponent {
    private logged: boolean = false;

    authState: any = AuthState;

    private loading: boolean = false;

    private state: AuthState = AuthState.Login;

    onRegister() {
        this.state = AuthState.Register;
    }

    onLogin() {
        this.loading = true;
        setTimeout(() => this.loading = false, 3000);
    }
}