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
        if (this.prevChatRoom && this.prevChatRoom == this.chatRoom) {
            return;
        }
        if (!this.prevChatRoom) {
            this.prevChatRoom = this.chatRoom;
        }
        this.chatService.getMessages(this.chatRoom).then((messages) => this.messages = messages);
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
        template: `
        <div class="enter-form" *ngIf="!name">
	        <div class="enter-text">
		        To join <strong>{{chatRoom.Name}}</strong> please, enter your name below.
	        </div>
	        <input type="text" (keyup.enter)="onNameSubmit(nameInput.value)" #nameInput>
	        <div>
		        <button class="btn-send" (click)="onNameSubmit(nameInput.value)">Enter</button>
	        </div>
        </div>

		<div class="conversation" *ngIf="messages && name" #chat [scrollTop]="chat.scrollHeight" [class.fullWidth]="hiddenChatList" [class.oneHunMarginLeft]="!minModeHiddenChatList">
			<div class="message-list" >
				<div class="message" [class.my-message] = "name == message.UserName" *ngFor="let message of messages">
					<span class="message-name">{{message.UserName}}</span><span class="message-time">{{message.PostedTime | date:'medium'}}</span>
					<span class="message-body">{{message.Body}}</span>
				</div>
			</div>
		</div>
		<div class="new-message" [class.fullWidth]="hiddenChatList" [class.oneHunMarginLeft]="!minModeHiddenChatList" *ngIf="messages && name">
			<div class="message-panel">
				<div class="message-input">
					<textarea placeholder="Type your message here..." #messageInput (keyup.enter)="sendMessage(messageInput.value); messageInput.value=''"></textarea>
				</div>
				<div class="message-send">
					<button class="send-btn" (click)="sendMessage(messageInput.value); messageInput.value=''">Send&ensp;<i class="fa fa-paper-plane" aria-hidden="true"></i></button>
				</div>
			</div>
		</div>
    `
    }), 
    __metadata('design:paramtypes', [chat_service_1.ChatService])
], ChatComponent);
exports.ChatComponent = ChatComponent;
//# sourceMappingURL=chat.component.js.map