import { Component, OnInit, Input, Output, EventEmitter, HostListener, OnChanges, OnDestroy } from '@angular/core';
import { ChatService } from '../shared/services/chat.service';
import { AuthService } from '../shared/services/auth.service';

import { LetterAvatarDirective } from '../shared/directives/letter-avatar.directive';

import { UserModel } from '../shared/models/user.model';
import { UserAccountModel } from '../shared/models/user-account.model';
import { MessageModel } from '../shared/models/message.model';
import { BriefDialogModel } from "../shared/models/brief-dialog.model";
import { TypingModel } from '../shared/models/typing.model';
import { ContactModel } from '../shared/models/contact.model';

import {Subscription} from "rxjs/Rx";

@Component({
    selector: 'div[chat-list]',
    templateUrl: 'app/chat-list/chat-list.component.html',
    styleUrls: ['app/chat-list/chat-list.component.css']
})
export class ChatListComponent implements OnInit, OnChanges, OnDestroy {

    @Input() minMode: boolean;

    @Input() minModeHiddenChatList: boolean;

    @Input() showSearch: boolean;

    @Input() isDark: boolean;

    @Output() notifyChatListState: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Output() notifySelectedUser: EventEmitter<UserModel> = new EventEmitter<UserModel>();

    private globalSearchEnabled: boolean = false;

    private contactsList: ContactModel[];

    private contactsListFiltered: ContactModel[];

    private userAccount: UserAccountModel;

    private filteredDialogs: BriefDialogModel[];

    private selectedDialog: BriefDialogModel;

    private user: UserModel;

    private chatSubscriptions: Subscription[] = [];

    constructor(private chatService: ChatService, private authService: AuthService) {
        this.chatService.starting$.subscribe(
            () => { console.log("signalr service has been started"); },
            () => { console.warn("signalr service failed to start!"); }
        );
    }

    ngOnInit() {
        this.chatSubscriptions.push(this.chatService.starting$.subscribe(() => {
            this.authService.getUser().then((user: UserModel) => {
                this.user = user;
                this.chatService.subscribeAccount(user.id, user.name);
            });
            this.chatService.getUserAccount().then((userAccount: UserAccountModel) => {
                this.userAccount = userAccount;
                this.filteredDialogs = userAccount.dialogs;
                this.chatService.subscribe(userAccount.dialogs.map(dialog => dialog.id));
                alert("Hi, " + userAccount.name + '!');
            });
        }));
        this.chatSubscriptions.push(this.chatService.newMessage$.subscribe((message: MessageModel) => {
            var msgDialog = this.userAccount.dialogs.filter(dialog => dialog.id == message.dialogId)[0];
            msgDialog.lastMessage = message;
            if (!this.selectedDialog || (this.selectedDialog && message.dialogId != this.selectedDialog.id) || (this.minMode && !this.minModeHiddenChatList)) {
                msgDialog.newMessagesNumber += 1;
            }
            if ((this.selectedDialog && message.dialogId == this.selectedDialog.id && message.user.id != this.user.id && ((this.minMode && this.minModeHiddenChatList) || !this.minMode))) {
                msgDialog.lastMessage.isReaded = true;
                this.chatService.setMessagesAsReaded(this.selectedDialog.id);
            }
            msgDialog.isTyping = false;
            this.userAccount.dialogs.sort((a, b) => {
                if (!a.lastMessage) {
                    return 1;
                }
                if (!b.lastMessage) {
                    return -1;
                }
                var aTicks = new Date(String(a.lastMessage.postedTime)).getTime();
                var bTicks = new Date(String(b.lastMessage.postedTime)).getTime();
                return bTicks - aTicks;
            }
            );
        }));
        this.chatSubscriptions.push(this.chatService.readedMessages$.subscribe((dialogId) => {
            this.userAccount.dialogs.find((dialog) => dialog.id == dialogId).lastMessage.isReaded = true;
        }));
        this.chatSubscriptions.push(this.chatService.userLastActivity$.subscribe((user: UserModel) => {
            if (user.id != this.user.id) {
                this.userAccount.dialogs
                    .filter((dialog) => dialog.members.map(member => member.id).indexOf(user.id) != -1)
                    .forEach((dialog) => {
                        console.log(dialog.members.find(member => member.id == user.id).lastTimeActivity);
                        dialog.members.find(member => member.id == user.id).lastTimeActivity = user.lastTimeActivity;
                        console.log(dialog.members.find(member => member.id == user.id).lastTimeActivity);
                    });
            }
        }));
        this.chatSubscriptions.push(this.chatService.isTyping$.subscribe((typing: TypingModel) => {
            if (this.user.id == typing.userId) {
                return;
            }
            var dialog = this.userAccount.dialogs.find((dialog) => dialog.id == typing.dialogId);
            if (!dialog.isTyping) {
                dialog.isTyping = true;
                setTimeout(() => { dialog.isTyping = false; console.log("user finished typing"); }, 2000);
            }
        }));
        this.chatSubscriptions.push(this.chatService.newDialog$.subscribe((dialog: BriefDialogModel) => {
            this.userAccount.dialogs.push(dialog);
            this.chatService.subscribe([dialog.id]);
            if (this.contactsList) {
                this.contactsList.find(contact => contact.id == dialog.members[0].id).isAdded = true;
            }
        }));
        this.chatService.connectToHub();
    }

    ngOnChanges() {
        if (!this.minMode && this.selectedDialog) {
            this.selectDialog(this.selectedDialog);
        }
    }

    ngOnDestroy() {
        this.chatSubscriptions.forEach((sub) => sub.unsubscribe());
    }

    onDialogSearch(filter: string) {
        filter = filter.trim().toLowerCase();
        if (filter) {
            if (this.globalSearchEnabled) {
                this.contactsListFiltered = this.contactsList.filter((contact) => contact.name.toLowerCase().indexOf(filter) >= 0);
            }
            else {
                this.filteredDialogs = this.userAccount.dialogs.filter((dialog) => dialog.members[0].name.toLowerCase().indexOf(filter) >= 0);
            }
        }
        else {
            if (this.globalSearchEnabled) {
                this.contactsListFiltered = this.contactsList;
            }
            else {
                this.filteredDialogs = this.userAccount.dialogs;
            }
        }
    }

    onSearchContacts() {
        this.globalSearchEnabled = true;
        this.chatService.getContactsList().then((contacts: ContactModel[]) => {
            this.contactsList = contacts;
            var addedContacts = this.userAccount.dialogs.map((dialog) => dialog.members[0].id);
            this.contactsListFiltered = this.contactsList.map((contact) => {
                if (addedContacts.indexOf(contact.id) != -1) {
                    contact.isAdded = true;
                }
                return contact;
            });
        });
    }

    onAddcontact(contact: ContactModel) {
        this.chatService.addNewContact(contact.id);
        /*this.chatService.getUserAccount().then((userAccount: UserAccountModel) => {
            this.userAccount = userAccount;
            this.filteredDialogs = userAccount.dialogs;
            this.chatService.subscribe(userAccount.dialogs.map(dialog => dialog.id));
        });*/
    }

    selectDialog(dialog: BriefDialogModel) {
        this.selectedDialog = dialog;
        if (this.selectedDialog.newMessagesNumber > 0) {
            this.chatService.setMessagesAsReaded(this.selectedDialog.id);
        }
        this.selectedDialog.newMessagesNumber = 0;
        if (this.selectedDialog.lastMessage && this.selectedDialog.lastMessage.user.id != this.user.id) {
            this.selectedDialog.lastMessage.isReaded = true;
        }
        this.notifyChatListState.emit(true);
        this.notifySelectedUser.emit(dialog.members[0]);
    }


    userIsOnline(user: UserModel) {
        var now = Date.now() + new Date().getTimezoneOffset() * 60 * 1000;
        var lastUserActivity = new Date(String(user.lastTimeActivity).replace('Z', '')).getTime();
        var secondsPass = (now - lastUserActivity) / 1000;
        //console.log("Chat-list:"+name + " last seen " + secondsPass + " seconds ago");
        if (now - lastUserActivity > 0 && (now - lastUserActivity) / 1000 < 60) {
            return true;
        }
        return false;
    }
}