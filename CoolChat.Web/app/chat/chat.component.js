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
let ChatComponent = class ChatComponent {
    constructor(chatService) {
        this.chatService = chatService;
        this.message = "Hi";
    }
    ngOnInit() {
        this.chatService.addMessageCallback((message) => {
            console.log("Message printing in chat component");
            this.message = message;
            console.log(this.message);
        });
        console.log("Callback for msg was added");
        this.chatService.getMessages(this.chatRoom).then((messages) => { this.messages = messages; console.log(messages); });
    }
    sendMessage() {
        console.log("Callback for msg was added");
        this.chatService.sendMessageToEverybody();
        console.log("Message was sent");
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
        <div class="chat-window">
	        <div class="messages" *ngIf="messages">
		        <div class="message" *ngFor="let message of messages">
			        <div class="name">
				        {{message.UserName}}
			        </div>
			        <div class="msg-body">
				        {{message.Body}}
			        </div>
		        </div>
	        </div>
	        <div class="msg-area">
		        <textarea></textarea>
		        <button class="btn-send">Send</button>
	        </div>
        </div>
    `
    }), 
    __metadata('design:paramtypes', [chat_service_1.ChatService])
], ChatComponent);
exports.ChatComponent = ChatComponent;
//# sourceMappingURL=chat.component.js.map