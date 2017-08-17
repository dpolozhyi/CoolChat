import { Component, OnInit, OnChanges, SimpleChanges, Input, ElementRef, ViewChild} from '@angular/core';
import { ChatService } from '../shared/services/chat.service';

import { UserModel } from '../shared/models/user.model';
import { MessageModel } from '../shared/models/message.model';
import { BriefDialogModel } from '../shared/models/brief-dialog.model';

export class MessageDisplayModel {
    constructor() { }

    id: number;
    scrollOffsetTopStart: number;
    scrollOffsetTopFinish: number;
}

@Component({
    selector: 'div[messages]',
    templateUrl: 'app/messages/messages.component.html',
    styleUrls: ['app/messages/messages.component.css']
})
export class MessagesComponent implements OnInit, OnChanges {

    @Input() hiddenChatList: boolean;

    @Input() minModeHiddenChatList: boolean;

    @Input() isDark: boolean;

    @Input() user: UserModel;

    @Input() briefDialog: BriefDialogModel;

    private prevBriefDialog: BriefDialogModel;

    private authorized: boolean;

    private name: string;

    private needTriggerScrollPosition: boolean;

    private scrollHeight: number = 0;

    private scrollOffset: number = 0;

    private messagesLoading: boolean = true;

    private messagesAfterLoading: boolean = false;

    private messages: MessageModel[];

    private messagesAvatarsOffset: MessageDisplayModel[] = [];

    @ViewChild('chat') chatDiv: ElementRef;

    constructor(private chatService: ChatService) { }

    ngOnInit() {
        /*this.chatService.addMessageCallback((message: MessageModel) => {
            this.scrollOffset = 0;
            this.messages.push(message);
        });
        this.chatService.getMessages(this.chatRoom).then((messages) => this.messages = messages);*/
        this.prevBriefDialog = this.briefDialog;
        this.chatService.getMessages(this.briefDialog.id).then((messages) => {
            this.messages = messages;
            this.messagesLoading = false;
            this.createOffsets(this.messages, this.messagesAvatarsOffset);
        });
        this.chatService.newMessage$.subscribe((message: MessageModel) => {
            if (message.dialogId == this.briefDialog.id) {
                this.messages.push(message);
            }
        });
    }

    ngDoCheck() {
        console.log(this.chatDiv.nativeElement.scrollHeight);
        if (this.scrollHeight == 0) {
            this.scrollHeight = this.chatDiv.nativeElement.scrollHeight;
            return;
        }
        if (this.chatDiv.nativeElement.scrollHeight != this.scrollHeight) {
            if (this.needTriggerScrollPosition) {
                this.scrollOffset = this.scrollHeight;
                this.needTriggerScrollPosition = false;
            }
            this.scrollHeight = this.chatDiv.nativeElement.scrollHeight;
        }
    }

    followingMessage(message: MessageModel): boolean {
        var index = this.messages.indexOf(message);
        if (index > 0) {
            if (this.messages[index - 1].user.id == message.user.id) {
                return true;
            }
        }
        return false;
    }

    messageAvatarOffsetTop(message: MessageModel) {

    }

    createOffsets(messages: MessageModel[], messagesOffset: MessageDisplayModel[]) {
        if (messages.length < 1) {
            return;
        }
        var prevMsg = messages[0];
        var scrollableMessage = new MessageDisplayModel();
        var chainedMessagesNum = 0;
        for (var i = 1; i < messages.length; i++) {
            if (messages[i].user.id == messages[i - 1].user.id) {
                if (chainedMessagesNum == 0) {
                    scrollableMessage.id = messages[i - 1].user.id;
                    scrollableMessage.scrollOffsetTopStart = (i - 1) * 93 + 11.5;
                }
                chainedMessagesNum++;
            }
            else {
                if (chainedMessagesNum > 0) {
                    scrollableMessage.scrollOffsetTopFinish = i * 93 - 11.5;
                    messagesOffset.push(scrollableMessage);
                    scrollableMessage = new MessageDisplayModel();
                    chainedMessagesNum = 0;
                }
            }
        }
        console.log(messagesOffset);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.prevBriefDialog && this.prevBriefDialog == this.briefDialog) {
            return;
        }
        this.messagesLoading = true;
        this.chatService.getMessages(this.briefDialog.id).then((messages) => {
            this.messages = messages;
            this.messagesLoading = false;
        });
        this.prevBriefDialog = this.briefDialog;

        this.scrollHeight = 0;
        this.scrollOffset = 0;
        /*
        this.chatService.getMessages(this.chatRoom).then((messages) => this.messages = messages);
        this.chatService.unsubscribe(String(this.prevChatRoom.Id)).then(() => { 
            console.log("Unsubscribed to " + this.prevChatRoom.Id);
            this.chatService.subscribe(String(this.chatRoom.Id));
            console.log("Subscribed to " + this.chatRoom.Id);
        });
        this.prevChatRoom = this.chatRoom;
        this.scrollOffset = 0;*/
    }

    sendMessage(msgText: string) {
        if (!msgText.trim()) {
            return;
        }
        var newMessage = new MessageModel();
        newMessage.body = msgText;
        newMessage.postedTime = new Date();
        newMessage.user = this.user;
        newMessage.dialogId = this.briefDialog.id;

        this.chatService.sendMessage(newMessage);
        this.scrollOffset = 0;
    }

    onMessageKeyUp() {
        this.chatService.isTyping(this.briefDialog.id, this.user.id);
    }

    printDate(date: Date) {
    }

    onMessageScroll(event) {
        const target = event.target;
        console.log("ScrollTop: " + target.scrollTop + " ScrollHeight: " + target.scrollHeight);
        if (target.scrollTop < 1 && !this.messagesAfterLoading) {
            this.messagesAfterLoading = true;
            this.chatService
                .getEarlyMessages(this.briefDialog.id, this.messages.length)
                .then((messages) => {
                    //this.scrollOffset = target.scrollHeight;
                    this.needTriggerScrollPosition = true;
                    messages.reverse().forEach((value) => this.messages.unshift(value));
                    this.messagesAfterLoading = false;
                });
        }
    }

    /*onNameSubmit(name: string) {
        if (name.trim()) {
            this.name = name.trim();
            this.chatService.subscribe(String(this.chatRoom.Id));
        }
    }*/

    /*onMessageScroll(event) {
        const target = event.target;
        if (target.scrollTop < 100 && !this.messagesLoading) {
            this.messagesLoading = true;
            this.chatService
                .getEarlyMessages(this.chatRoom.Id, this.messages.length)
                .then((messages) => {
                    this.scrollOffset = target.scrollHeight - target.scrollTop;
                    messages.reverse().forEach((value) => this.messages.unshift(value));
                    this.messagesLoading = false;
                });
        }*/

    /* Why this isn't working? */
    /*const target = event.target;
    console.log(event.srcElement.scrollTop);
    if (target.scrollTop < 1 && !this.messagesLoading) {
        console.log("Scroll Height: " + target.scrollHeight);
        console.log("Scroll Top: " + target.scrollTop);
        var currentPosition = target.scrollHeight - target.scrollTop;
        console.log("Triggered, scroll offset " + currentPosition)
        this.messagesLoading = true;
        this.chatService
            .getEarlyMessages(this.chatRoom.Id, this.messages.length)
            .then((messages) => {
                this.scrollOffset = currentPosition;
                console.log("Scroll offset is set: " + this.scrollOffset);
                messages.reverse().forEach((value) => this.messages.unshift(value));
                this.messagesLoading = false;
            });
    }
}*/
}