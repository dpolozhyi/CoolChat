import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { ChatService } from '../shared/services/chat.service';

import { ChatRoomModel } from '../shared/models/chatroom.model';
import { MessageModel } from '../shared/models/message.model';

@Component({
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
})
export class ChatComponent implements OnInit, OnChanges {

    @Input() chatRoom: ChatRoomModel;

    @Input() hiddenChatList: boolean;

    @Input() minModeHiddenChatList: boolean;

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