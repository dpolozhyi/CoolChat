import { Component, ViewEncapsulation, Input, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../shared/services/auth.service';

@Component({
    selector: 'div[chat]',
    templateUrl: 'app/chat/chat.component.html',
    styleUrls: ['app/chat/chat.component.css']
})
export class ChatComponent implements OnInit {
    private minModeHiddenChatList: boolean = false;

    private expandedSettings: boolean = false;

    private hideSettingsTimeout: number;

    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit() {
        this.handleViewPortWidth(window.innerWidth);
    }

    onLogout() {
        this.authService.logOut();
        this.router.navigate(['login']);
    }

    onSettingsButtonMouseMove() {
        this.expandedSettings = true;
        if (this.hideSettingsTimeout) {
            clearTimeout(this.hideSettingsTimeout);
        }
        this.hideSettingsTimeout = setTimeout(() => this.expandedSettings = false, 800);
    }

    handleViewPortWidth(width) {
        if (width > 767) {
            this.minModeHiddenChatList = true;
        }
        else {
            this.minModeHiddenChatList = false;
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
        }
    }
}