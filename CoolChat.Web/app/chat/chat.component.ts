import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from '../shared/services/chat.service';

import { ChatRoomModel } from '../shared/models/chatroom.model';
import { MessageModel } from '../shared/models/message.model';

@Component({
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
})
export class ChatComponent implements OnInit {

    @Input() chatRoom: ChatRoomModel;

    private messages: MessageModel[];

    private message: string = "Hi";

    constructor(private chatService: ChatService) { }

    ngOnInit() {
        this.chatService.addMessageCallback((message: string) => {
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
}