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
const chatroom_model_1 = require('../shared/models/chatroom.model');
const message_model_1 = require('../shared/models/message.model');
let ChatComponent = class ChatComponent {
    constructor(chatService) {
        this.chatService = chatService;
        this.scrollOffset = 0;
        this.messagesLoading = false;
    }
    ngOnInit() {
        this.chatService.addMessageCallback((message) => {
            this.scrollOffset = 0;
            this.messages.push(message);
        });
        this.chatService.getMessages(this.chatRoom).then((messages) => this.messages = messages);
        this.prevChatRoom = this.chatRoom;
    }
    ngOnChanges(changes) {
        if (this.prevChatRoom && this.prevChatRoom == this.chatRoom) {
            return;
        }
        if (!this.prevChatRoom) {
            this.prevChatRoom = this.chatRoom;
        }
        this.chatService.getMessages(this.chatRoom).then((messages) => this.messages = messages);
        this.chatService.unsubscribe(String(this.prevChatRoom.Id)).then(() => this.chatService.subscribe(String(this.chatRoom.Id)));
        this.prevChatRoom = this.chatRoom;
        this.scrollOffset = 0;
    }
    sendMessage(msgText) {
        if (!msgText.trim()) {
            return;
        }
        var newMessage = new message_model_1.MessageModel();
        newMessage.Body = msgText;
        newMessage.PostedTime = new Date();
        newMessage.UserName = this.name;
        newMessage.ChatRoomId = this.chatRoom.Id;
        this.chatService.sendMessage(newMessage);
    }
    onNameSubmit(name) {
        if (name.trim()) {
            this.name = name.trim();
            this.chatService.subscribe(String(this.chatRoom.Id));
        }
    }
    onMessageScroll(event) {
        const target = event.target;
        if (target.scrollTop < 1 && !this.messagesLoading) {
            var currentPosition = target.scrollHeight - target.scrollTop;
            console.log("Trigerred");
            console.log("Before loading scroll height:" + target.scrollHeight);
            this.messagesLoading = true;
            this.chatService
                .getEarlyMessages(this.chatRoom.Id, this.messages.length)
                .then((messages) => {
                console.log("Offset after loading:" + currentPosition);
                messages.reverse().forEach((value) => this.messages.unshift(value));
                this.scrollOffset = currentPosition;
                console.log("Scroll height after loading:" + target.scrollHeight);
                console.log("Scroll top after loading:" + target.scrollTop);
                this.messagesLoading = false;
            });
        }
    }
};
__decorate([
    core_1.Input(), 
    __metadata('design:type', chatroom_model_1.ChatRoomModel)
], ChatComponent.prototype, "chatRoom", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Boolean)
], ChatComponent.prototype, "hiddenChatList", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Boolean)
], ChatComponent.prototype, "minModeHiddenChatList", void 0);
ChatComponent = __decorate([
    core_1.Component({
        selector: 'div[chat]',
        templateUrl: 'app/chat/chat.component.html',
        styleUrls: ['app/chat/chat.component.css']
    }), 
    __metadata('design:paramtypes', [chat_service_1.ChatService])
], ChatComponent);
exports.ChatComponent = ChatComponent;
//# sourceMappingURL=chat.component.js.map