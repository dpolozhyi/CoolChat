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
    }
    ngOnInit() {
        this.chatService.addMessageCallback((message) => {
            this.messages.push(message);
        });
        this.chatService.getMessages(this.chatRoom).then((messages) => this.messages = messages);
        this.prevChatRoom = this.chatRoom;
    }
    ngOnChanges(changes) {
        this.chatService.getMessages(this.chatRoom).then((messages) => this.messages = messages);
        if (!this.prevChatRoom) {
            this.prevChatRoom = this.chatRoom;
        }
        this.chatService.unsubscribe(String(this.prevChatRoom.Id)).then(() => this.chatService.subscribe(String(this.chatRoom.Id)));
        this.prevChatRoom = this.chatRoom;
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
};
__decorate([
    core_1.Input(), 
    __metadata('design:type', chatroom_model_1.ChatRoomModel)
], ChatComponent.prototype, "chatRoom", void 0);
ChatComponent = __decorate([
    core_1.Component({
        selector: 'chat',
        template: `
        <div class="chat-window" *ngIf="name">
	        <div class="messages" *ngIf="messages" #chat [scrollTop]="chat.scrollHeight">
		        <div class="message" *ngFor="let message of messages">
                    <div class="sender">
				        <span class="name">{{message.UserName}}</span>&ensp;<span class="time">{{message.PostedTime | date:'medium'}}</span>
			        </div>
			        <div class="msg-body">
				        {{message.Body}}
			        </div>
		        </div>
	        </div>
	        <div class="msg-area">
		        <textarea #messageInput  (keyup.enter)="sendMessage(messageInput.value); messageInput.value=''"></textarea>
		        <button class="btn-send" (click)="sendMessage(messageInput.value); messageInput.value=''">Send</button>
	        </div>
        </div>
        <div class="enter-form" *ngIf="!name">
	        <div class="enter-text">
		        To join <strong>{{chatRoom.Name}}</strong> please, enter your name below.
	        </div>
	        <input type="text" (keyup.enter)="onNameSubmit(nameInput.value)" #nameInput>
	        <div>
		        <button class="btn-send" (click)="onNameSubmit(nameInput.value)">Enter</button>
	        </div>
        </div>
    `
    }), 
    __metadata('design:paramtypes', [chat_service_1.ChatService])
], ChatComponent);
exports.ChatComponent = ChatComponent;
//# sourceMappingURL=chat.component.js.map