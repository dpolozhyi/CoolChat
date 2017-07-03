import { Component, OnInit } from '@angular/core';
import { ChatService } from '../shared/services/chat.service';

import { ChatRoomModel } from '../shared/models/chatroom.model';

@Component({
    selector: 'chat-list',
    template: `
        <div class="chat-list">
	        <ul class="room-list">
                <li *ngFor="let room of roomList" [class.selectedRoom] = "room == selectedRoom" (click)="selectRoom(room)">{{room.Name}}</li>
	        </ul>
        </div>
        <chat [chatRoom]="selectedRoom" *ngIf="selectedRoom"></chat>
    `
})
export class ChatListComponent implements OnInit{

    private roomList: ChatRoomModel[];

    private selectedRoom: ChatRoomModel;

    constructor(private chatService: ChatService) { }

    ngOnInit() {
        this.chatService.getChatRoomList().then(data => this.roomList = data);
    }

    selectRoom(room: ChatRoomModel) {
        this.selectedRoom = room;
    }
}