"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require('@angular/core');
const router_1 = require('@angular/router');
const auth_service_1 = require('../shared/services/auth.service');
let ChatComponent = class ChatComponent {
    constructor(authService, router) {
        this.authService = authService;
        this.router = router;
        this.minModeHiddenChatList = false;
        this.minMode = false;
        this.showSearch = false;
        this.isDark = false;
        this.expandedSettings = false;
    }
    ngOnInit() {
        this.handleViewPortWidth(window.innerWidth);
    }
    onSelectedUser(user) {
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
    onChatListStateChanged(state) {
        this.minModeHiddenChatList = state;
    }
    userIsOnline() {
        var now = Date.now() + new Date().getTimezoneOffset() * 60 * 1000;
        var lastUserActivity = new Date(String(this.selectedUser.lastTimeActivity).replace('Z', '')).getTime();
        var secondsPass = (now - lastUserActivity) / 1000;
        //console.log(this.selectedUser.name + " last seen " + secondsPass + " seconds ago");
        if (now - lastUserActivity > 0 && (now - lastUserActivity) / 1000 < 60) {
            return true;
        }
        return false;
    }
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
};
__decorate([
    core_1.HostListener('document:click', ['$event']), 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', [Object]), 
    __metadata('design:returntype', void 0)
], ChatComponent.prototype, "handleClick", null);
__decorate([
    core_1.HostListener('window:resize', ['$event']), 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', [Object]), 
    __metadata('design:returntype', void 0)
], ChatComponent.prototype, "onResize", null);
ChatComponent = __decorate([
    core_1.Component({
        selector: 'div[chat]',
        templateUrl: 'app/chat/chat.component.html',
        styleUrls: ['app/chat/chat.component.css']
    }), 
    __metadata('design:paramtypes', [auth_service_1.AuthService, router_1.Router])
], ChatComponent);
exports.ChatComponent = ChatComponent;
//# sourceMappingURL=chat.component.js.map