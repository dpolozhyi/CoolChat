import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { ChatService } from '../shared/services/chat.service';

import { ChatRoomModel } from '../shared/models/chatroom.model';

@Component({
    selector: 'div[chat-list]',
    templateUrl: 'app/chat-list/chat-list.component.html',
    styleUrls: ['app/chat-list/chat-list.component.css']
})
export class ChatListComponent implements OnInit{

    @Input() hiddenChatList: boolean;

    @Input() minModeHiddenChatList: boolean;

    @Output() notifyChatListState: EventEmitter<boolean> = new EventEmitter<boolean>();

    private roomList: ChatRoomModel[];

    private selectedRoom: ChatRoomModel;

    constructor(private chatService: ChatService) {
        this.chatService.starting$.subscribe(
            () => { console.log("signalr service has been started"); },
            () => { console.warn("signalr service failed to start!"); }
        );
    }

    ngOnInit() {
        this.chatService.connect();
        this.chatService.getChatRoomList().then(data => this.roomList = data);

    }

    selectRoom(room: ChatRoomModel) {
        console.log(this.hiddenChatList);
        this.selectedRoom = room;
        this.notifyChatListState.emit(true);
    }

    @HostListener('mousemove', ['$event'])
    onMouseMove(event) {
        if (event.clientX < 2) {
            this.hiddenChatList = false;
        }
    }
}