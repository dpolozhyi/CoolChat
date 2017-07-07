import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { ChatService } from '../shared/services/chat.service';

import { ChatRoomModel } from '../shared/models/chatroom.model';
import { MessageModel } from '../shared/models/message.model';

@Component({
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
})
export class ChatComponent implements OnInit, OnChanges {

    @Input() chatRoom: ChatRoomModel;

    private prevChatRoom: ChatRoomModel;

    private authorized: boolean;

    private name: string;

    private messages: MessageModel[];

    constructor(private chatService: ChatService) { }

    ngOnInit() {
        this.chatService.addMessageCallback((message: MessageModel) => {
            this.messages.push(message);
        });
        this.chatService.getMessages(this.chatRoom).then((messages) => this.messages = messages);
        this.prevChatRoom = this.chatRoom;
    }

    ngOnChanges(changes: SimpleChanges) {
        this.chatService.getMessages(this.chatRoom).then((messages) => this.messages = messages);
        if (!this.prevChatRoom) {
            this.prevChatRoom = this.chatRoom;
        }
        this.chatService.unsubscribe(String(this.prevChatRoom.Id)).then(() => this.chatService.subscribe(String(this.chatRoom.Id)));
        this.prevChatRoom = this.chatRoom;
    }

    sendMessage(msgText: string) {
        if (!msgText.trim()) {
            return;
        }
        var newMessage = new MessageModel();
        newMessage.Body = msgText;
        newMessage.PostedTime = new Date();
        newMessage.UserName = this.name;
        newMessage.ChatRoomId = this.chatRoom.Id;

        this.chatService.sendMessage(newMessage);
    }

    onNameSubmit(name: string) {
        if (name.trim()) {
            this.name = name.trim();
            this.chatService.subscribe(String(this.chatRoom.Id));
        }
    }
}