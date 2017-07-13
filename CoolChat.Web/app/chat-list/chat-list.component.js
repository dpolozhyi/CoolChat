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
let ChatListComponent = class ChatListComponent {
    constructor(chatService) {
        this.chatService = chatService;
        this.notifyChatListState = new core_1.EventEmitter();
    }
    ngOnInit() {
        this.chatService.getChatRoomList().then(data => this.roomList = data);
    }
    selectRoom(room) {
        this.selectedRoom = room;
        this.notifyChatListState.emit(true);
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
ChatListComponent = __decorate([
    core_1.Component({
        selector: 'div[chat-list]',
        templateUrl: 'app/chat-list/chat-list.component.html',
        styleUrls: ['app/chat-list/chat-list.component.css']
    }), 
    __metadata('design:paramtypes', [chat_service_1.ChatService])
], ChatListComponent);
exports.ChatListComponent = ChatListComponent;
//# sourceMappingURL=chat-list.component.js.map