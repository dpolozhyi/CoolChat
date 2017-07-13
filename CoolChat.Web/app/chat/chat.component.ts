import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { ChatService } from '../shared/services/chat.service';

import { ChatRoomModel } from '../shared/models/chatroom.model';
import { MessageModel } from '../shared/models/message.model';

@Component({
    selector: 'div[chat]',
    templateUrl: 'app/chat/chat.component.html',
    styleUrls: ['app/chat/chat.component.css']
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