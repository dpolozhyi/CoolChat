import { Component, OnInit, OnChanges, SimpleChanges, Input} from '@angular/core';
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

    private scrollOffset: number = 0;

    private messagesLoading: boolean = false;

    private messages: MessageModel[];

    constructor(private chatService: ChatService) { }

    ngOnInit() {
        this.chatService.addMessageCallback((message: MessageModel) => {
            this.scrollOffset = 0;
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
        this.scrollOffset = 0;
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
}