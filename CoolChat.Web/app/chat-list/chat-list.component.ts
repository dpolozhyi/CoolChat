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

    constructor(private chatService: ChatService) { }

    ngOnInit() {
        this.chatService.getChatRoomList().then(data => this.roomList = data);
    }

    selectRoom(room: ChatRoomModel) {
        this.selectedRoom = room;
        this.notifyChatListState.emit(true);
    }
}