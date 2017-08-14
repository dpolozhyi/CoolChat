import { Component, ViewEncapsulation, Input, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FocusDirective } from '../shared/directives/focus.directive';

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

    private isDark: boolean = false;

    private expandedSettings: boolean = false;

    private selectedUser: UserModel;

    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit() {
        this.handleViewPortWidth(window.innerWidth);
    }

    onSelectedUser(user: UserModel) {
        this.selectedUser = user;
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

    userIsOnline() {
        var now = Date.now() + new Date().getTimezoneOffset() * 60 * 1000;
        var lastUserActivity = new Date(String(this.selectedUser.lastTimeActivity).replace('Z', '')).getTime();
        var secondsPass = (now - lastUserActivity) / 1000;
        console.log(this.selectedUser.name + " last seen " + secondsPass + " seconds ago");
        if (now - lastUserActivity > 0 && (now - lastUserActivity) / 1000 < 60) {
            return true;
        }
        return false;
    }

    @HostListener('document:click', ['$event'])
    handleClick(event) {
        var hideSettings = true;
        var path;
        if (event.path) {
            path = event.path;
        }
        else {
            path = this.composedPath(event.target);
        }
        console.log(path);
        if (!path) {
            return;
        }
        path.forEach((value) => {
            var className = value.className;
            var setExp = className ? value.className.indexOf("settings-expanded") != -1 : false;
            var navBtn = className ? value.className.indexOf("nav-button") != -1 : false;
            if (className && (setExp || navBtn)) {
                hideSettings = false;
            }
        });
        if (hideSettings) {
            this.expandedSettings = false;
        }
    }

    composedPath(el) {
        var path = [];
        while (el) {
            path.push(el);
            if (el.tagName === 'HTML') {
                path.push(document);
                path.push(window);

                return path;
            }
            el = el.parentElement;
        }
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
            this.expandedSettings = false;
        }
    }
}