import { Component, OnInit, Input, Output, EventEmitter, HostListener, OnChanges } from '@angular/core';
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
export class ChatListComponent implements OnInit, OnChanges {

    @Input() minMode: boolean;

    @Input() minModeHiddenChatList: boolean;

    @Input() isDark: boolean;

    @Output() notifyChatListState: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Output() notifySelectedUser: EventEmitter<UserModel> = new EventEmitter<UserModel>();

    private userAccount: UserAccountModel;

    private filteredDialogs: BriefDialogModel[];

    private selectedDialog: BriefDialogModel;

    private user: UserModel;

    constructor(private chatService: ChatService, private authService: AuthService) {
        this.chatService.starting$.subscribe(
            () => { console.log("signalr service has been started"); },
            () => { console.warn("signalr service failed to start!"); }
        );
    }

    ngOnInit() {
        this.chatService.starting$.subscribe(() => {
            this.authService.getUser().then((user: UserModel) => this.user = user);
            this.chatService.getUserAccount().then((userAccount: UserAccountModel) => {
                this.userAccount = userAccount;
                this.filteredDialogs = userAccount.dialogs;
                this.chatService.subscribe(userAccount.dialogs.map(dialog => dialog.id));
                alert("Hi, " + userAccount.name + '!');
            });
        });
        this.chatService.newMessage$.subscribe((message: MessageModel) => {
            var msgDialog = this.userAccount.dialogs.filter(dialog => dialog.id == message.dialogId)[0];
            msgDialog.lastMessage = message;
            if (!this.selectedDialog || (this.selectedDialog && message.dialogId != this.selectedDialog.id) || (this.minMode && !this.minModeHiddenChatList)) {
                msgDialog.newMessagesNumber += 1;
            }
            if ((this.selectedDialog && message.dialogId == this.selectedDialog.id && message.user.id != this.user.id && ((this.minMode && this.minModeHiddenChatList) || !this.minMode))) {
                msgDialog.lastMessage.isReaded = true;
                this.chatService.setMessagesAsReaded(this.selectedDialog.id);
            }
            this.userAccount.dialogs.sort((a, b) => {
                var aTicks = new Date(String(a.lastMessage.postedTime)).getTime();
                var bTicks = new Date(String(b.lastMessage.postedTime)).getTime();
                return bTicks - aTicks;
            }
            );
        });
        this.chatService.readedMessages$.subscribe((dialogId) => {
            this.userAccount.dialogs.find((dialog) => dialog.id == dialogId).lastMessage.isReaded = true;
        });
    }

    ngOnChanges() {
        if (!this.minMode && this.selectedDialog) {
            this.selectDialog(this.selectedDialog);
        }
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
        this.selectedDialog = dialog;
        if (this.selectedDialog.newMessagesNumber > 0) {
            this.chatService.setMessagesAsReaded(this.selectedDialog.id);
        }
        this.selectedDialog.newMessagesNumber = 0;
        if (this.selectedDialog.lastMessage.user.id != this.user.id) {
            this.selectedDialog.lastMessage.isReaded = true;
        }
        this.notifyChatListState.emit(true);
        this.notifySelectedUser.emit(dialog.members[0]);
    }
}