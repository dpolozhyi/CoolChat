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
const chat_service_1 = require('../shared/services/chat.service');
const auth_service_1 = require('../shared/services/auth.service');
let ChatListComponent = class ChatListComponent {
    constructor(chatService, authService) {
        this.chatService = chatService;
        this.authService = authService;
        this.notifyChatListState = new core_1.EventEmitter();
        this.notifySelectedUser = new core_1.EventEmitter();
        this.chatService.starting$.subscribe(() => { console.log("signalr service has been started"); }, () => { console.warn("signalr service failed to start!"); });
    }
    ngOnInit() {
        this.authService.getUser().then((user) => this.user = user);
        this.chatService.getUserAccount().then((userAccount) => {
            this.userAccount = userAccount;
            this.filteredDialogs = userAccount.dialogs;
            this.chatService.subscribe(userAccount.dialogs.map(dialog => dialog.id));
            alert("Hi, " + userAccount.name + '!');
        });
        this.chatService.newMessage$.subscribe((message) => {
            var msgDialog = this.userAccount.dialogs.filter(dialog => dialog.id == message.dialogId)[0];
            msgDialog.lastMessage = message;
            if (!this.selectedDialog || (this.selectedDialog && message.dialogId != this.selectedDialog.id)) {
                msgDialog.newMessagesNumber += 1;
            }
            if (this.selectedDialog && message.dialogId == this.selectedDialog.id && message.user.id != this.user.id) {
                msgDialog.lastMessage.isReaded = true;
            }
        });
    }
    onDialogSearch(filter) {
        if (filter) {
            this.filteredDialogs = this.userAccount.dialogs.filter((dialog) => dialog.members[0].name.indexOf(filter) >= 0);
        }
        else {
            this.filteredDialogs = this.userAccount.dialogs;
        }
    }
    selectDialog(dialog) {
        console.log(this.hiddenChatList);
        this.selectedDialog = dialog;
        if (this.selectedDialog.newMessagesNumber > 0) {
            this.chatService.setMessagesAsReaded(this.selectedDialog.id);
        }
        this.selectedDialog.newMessagesNumber = 0;
        this.selectedDialog.lastMessage.isReaded = true;
        this.notifyChatListState.emit(true);
        this.notifySelectedUser.emit(dialog.members[0]);
    }
    onMouseMove(event) {
        if (event.clientX < 2) {
            this.hiddenChatList = false;
        }
    }
};
__decorate([
    core_1.Input(), 
    __metadata('design:type', Boolean)
], ChatListComponent.prototype, "hiddenChatList", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Boolean)
], ChatListComponent.prototype, "minModeHiddenChatList", void 0);
__decorate([
    core_1.Output(), 
    __metadata('design:type', core_1.EventEmitter)
], ChatListComponent.prototype, "notifyChatListState", void 0);
__decorate([
    core_1.Output(), 
    __metadata('design:type', core_1.EventEmitter)
], ChatListComponent.prototype, "notifySelectedUser", void 0);
__decorate([
    core_1.HostListener('mousemove', ['$event']), 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', [Object]), 
    __metadata('design:returntype', void 0)
], ChatListComponent.prototype, "onMouseMove", null);
ChatListComponent = __decorate([
    core_1.Component({
        selector: 'div[chat-list]',
        templateUrl: 'app/chat-list/chat-list.component.html',
        styleUrls: ['app/chat-list/chat-list.component.css']
    }), 
    __metadata('design:paramtypes', [chat_service_1.ChatService, auth_service_1.AuthService])
], ChatListComponent);
exports.ChatListComponent = ChatListComponent;
//# sourceMappingURL=chat-list.component.js.map