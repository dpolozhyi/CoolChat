import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { ChatService } from '../shared/services/chat.service';
import { AuthService } from '../shared/services/auth.service';

import { UserModel } from '../shared/models/user.model';
import { UserAccountModel } from '../shared/models/user-account.model';
import { MessageModel } from '../shared/models/message.model';
import { BriefDialogModel } from "../shared/models/brief-dialog.model"

@Component({
    selector: 'div[chat-list]',
    templateUrl: 'app/chat-list/chat-list.component.html',
    styleUrls: ['app/chat-list/chat-list.component.css']
})
export class ChatListComponent implements OnInit{

    @Input() hiddenChatList: boolean;

    @Input() minModeHiddenChatList: boolean;

    @Output() notifyChatListState: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Output() notifySelectedUser: EventEmitter<UserModel> = new EventEmitter<UserModel>();

    private userAccount: UserAccountModel;

    private filteredDialogs: BriefDialogModel[];

    private selectedDialog: BriefDialogModel;

    private user: UserModel;

    constructor(private chatService: ChatService, private authService: AuthService) {
        /*this.chatService.starting$.subscribe(
            () => { console.log("signalr service has been started"); },
            () => { console.warn("signalr service failed to start!"); }
        );*/
    }

    ngOnInit() {
       /* this.chatService.connect();
        this.chatService.getChatRoomList().then(data => this.roomList = data);*/
        this.authService.getUser().then((user: UserModel) => this.user = user);
        this.chatService.getUserAccount().then((userAccount: UserAccountModel) => {
            this.userAccount = userAccount;
            this.filteredDialogs = userAccount.dialogs;
            alert("Hi, " + userAccount.name + '!');
        });
    }

    onDialogSearch(filter: string) {
        if (filter) {
            this.filteredDialogs = this.userAccount.dialogs.filter((dialog) => dialog.members[0].name.indexOf(filter) >= 0);
        }
        else {
            this.filteredDialogs = this.userAccount.dialogs;
        }
    }

    selectDialog(dialog: BriefDialogModel) {
        console.log(this.hiddenChatList);
        this.selectedDialog = dialog;
        this.notifyChatListState.emit(true);
        this.notifySelectedUser.emit(dialog.members[0]);
    }

    @HostListener('mousemove', ['$event'])
    onMouseMove(event) {
        if (event.clientX < 2) {
            this.hiddenChatList = false;
        }
    }
}