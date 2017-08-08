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
    onSettingsButtonMouseMove() {
        this.expandedSettings = true;
        if (this.hideSettingsTimeout) {
            clearTimeout(this.hideSettingsTimeout);
        }
        this.hideSettingsTimeout = setTimeout(() => this.expandedSettings = false, 8000);
    }
    handleViewPortWidth(width) {
        if (width > 767) {
            this.minModeHiddenChatList = true;
        }
        else {
            this.minModeHiddenChatList = false;
        }
    }
    onChatListStateChanged(state) {
        this.minModeHiddenChatList = state;
    }
    onResize(event) {
        const target = event.target;
        if (target.innerWidth > 767) {
            this.minModeHiddenChatList = true;
        }
    }
};
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