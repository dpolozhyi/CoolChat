import { Component, ViewEncapsulation, Input, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserModel } from '../shared/models/user.model';

import { AuthService } from '../shared/services/auth.service';

@Component({
    selector: 'div[chat]',
    templateUrl: 'app/chat/chat.component.html',
    styleUrls: ['app/chat/chat.component.css']
})
export class ChatComponent implements OnInit {
    private minModeHiddenChatList: boolean = false;

    private minMode: boolean = false;

    private expandedSettings: boolean = false;

    private selectedUser: UserModel;

    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit() {
        this.handleViewPortWidth(window.innerWidth);
    }

    onSelectedUser(user: UserModel) {
        this.selectedUser = user;
        this.expandedSettings = false;
    }

    onLogout() {
        this.authService.logOut();
        this.router.navigate(['login']);
    }

    handleViewPortWidth(width) {
        if (width > 767) {
            this.minModeHiddenChatList = true;
            this.minMode = false;
        }
        else {
            this.minModeHiddenChatList = false;
            this.minMode = true;
        }
    }

    onNavMenuClick() {
        if (this.minModeHiddenChatList && this.minMode) {
            this.minModeHiddenChatList = false;
        }
        else {
            this.expandedSettings = !this.expandedSettings;
        }
    }

    onChatListStateChanged(state: boolean) {
        this.minModeHiddenChatList = state;
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        const target = event.target;
        if (target.innerWidth > 767) {
            this.minModeHiddenChatList = true;
            this.minMode = false;
        }
        else {
            this.minMode = true;
        }
    }
}