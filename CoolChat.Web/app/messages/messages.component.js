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
const user_model_1 = require('../shared/models/user.model');
const brief_dialog_model_1 = require('../shared/models/brief-dialog.model');
let MessagesComponent = class MessagesComponent {
    constructor(chatService) {
        this.chatService = chatService;
        this.scrollOffset = 0;
        this.messagesLoading = false;
    }
    ngOnInit() {
        /*this.chatService.addMessageCallback((message: MessageModel) => {
            this.scrollOffset = 0;
            this.messages.push(message);
        });
        this.chatService.getMessages(this.chatRoom).then((messages) => this.messages = messages);
        this.prevChatRoom = this.chatRoom;*/
        this.chatService.getMessages(this.briefDialog.id).then((messages) => this.messages = messages);
    }
    ngOnChanges(changes) {
        this.chatService.getMessages(this.briefDialog.id).then((messages) => this.messages = messages);
        /*if (this.prevChatRoom && this.prevChatRoom == this.chatRoom) {
            return;
        }
        if (!this.prevChatRoom) {
            this.prevChatRoom = this.chatRoom;
        }
        this.chatService.getMessages(this.chatRoom).then((messages) => this.messages = messages);
        this.chatService.unsubscribe(String(this.prevChatRoom.Id)).then(() => {
            console.log("Unsubscribed to " + this.prevChatRoom.Id);
            this.chatService.subscribe(String(this.chatRoom.Id));
            console.log("Subscribed to " + this.chatRoom.Id);
        });
        this.prevChatRoom = this.chatRoom;
        this.scrollOffset = 0;*/
    }
};
__decorate([
    core_1.Input(), 
    __metadata('design:type', Boolean)
], MessagesComponent.prototype, "hiddenChatList", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Boolean)
], MessagesComponent.prototype, "minModeHiddenChatList", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', user_model_1.UserModel)
], MessagesComponent.prototype, "user", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', brief_dialog_model_1.BriefDialogModel)
], MessagesComponent.prototype, "briefDialog", void 0);
MessagesComponent = __decorate([
    core_1.Component({
        selector: 'div[messages]',
        templateUrl: 'app/messages/messages.component.html',
        styleUrls: ['app/messages/messages.component.css']
    }), 
    __metadata('design:paramtypes', [chat_service_1.ChatService])
], MessagesComponent);
exports.MessagesComponent = MessagesComponent;
//# sourceMappingURL=messages.component.js.map