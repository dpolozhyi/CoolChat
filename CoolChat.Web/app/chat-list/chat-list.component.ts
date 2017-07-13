import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { ChatService } from '../shared/services/chat.service';

import { ChatRoomModel } from '../shared/models/chatroom.model';

@Component({
    selector: 'div[chat-list]',
    template: `
            <div class="chat-list" [class.hiddenChatList]="hiddenChatList" [class.fullWidth]="!minModeHiddenChatList" [class.zeroMarginLeft]="!minModeHiddenChatList">
		        <ul>
			        <li class="room-list" *ngFor="let room of roomList" [class.selectedRoom] = "room == selectedRoom" (click)="selectRoom(room)">{{room.Name}}</li>
		        </ul>
		        <div class="hide" id="hide-button" [class.hiddenHideButton]="hiddenChatList" (click)="hiddenChatList = !hiddenChatList">
			        <i class="fa fa-arrow-left" aria-hidden="true"></i>
		        </div>
	        </div>

            <div chat class="chat-area" [minModeHiddenChatList]="minModeHiddenChatList" [class.fullWidth]="hiddenChatList" [class.oneHunMarginLeft]="!minModeHiddenChatList" [chatRoom]="selectedRoom" [hiddenChatList]="hiddenChatList" *ngIf="selectedRoom"></div>
    `
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