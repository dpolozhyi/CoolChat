"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require('@angular/core');
const chat_service_1 = require('../shared/services/chat.service');
const user_model_1 = require('../shared/models/user.model');
const message_model_1 = require('../shared/models/message.model');
const brief_dialog_model_1 = require('../shared/models/brief-dialog.model');
class MessageDisplayModel {
    constructor() {
    }
}
exports.MessageDisplayModel = MessageDisplayModel;
let MessagesComponent = class MessagesComponent {
    constructor(chatService) {
        this.chatService = chatService;
        this.scrollHeight = 0;
        this.scrollOffset = 0;
        this.messagesLoading = true;
        this.messagesAfterLoading = false;
        this.messagesAvatarsOffset = [];
    }
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
        this.chatService.newMessage$.subscribe((message) => {
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
    followingMessage(message) {
        var index = this.messages.indexOf(message);
        if (index > 0) {
            if (this.messages[index - 1].user.id == message.user.id) {
                return true;
            }
        }
        return false;
    }
    messageAvatarOffsetTop(message) {
    }
    createOffsets(messages, messagesOffset) {
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
    ngOnChanges(changes) {
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
    sendMessage(msgText) {
        if (!msgText.trim()) {
            return;
        }
        var newMessage = new message_model_1.MessageModel();
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
    printDate(date) {
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
};
__decorate([
    core_1.Input(), 
    __metadata('design:type', Boolean)
], MessagesComponent.prototype, "hiddenChatList", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Boolean)
], MessagesComponent.prototype, "minModeHiddenChatList", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Boolean)
], MessagesComponent.prototype, "isDark", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', user_model_1.UserModel)
], MessagesComponent.prototype, "user", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', brief_dialog_model_1.BriefDialogModel)
], MessagesComponent.prototype, "briefDialog", void 0);
__decorate([
    core_1.ViewChild('chat'), 
    __metadata('design:type', core_1.ElementRef)
], MessagesComponent.prototype, "chatDiv", void 0);
MessagesComponent = __decorate([
    core_1.Component({
        selector: 'div[messages]',
        templateUrl: 'app/messages/messages.component.html',
        styleUrls: ['app/messages/messages.component.css']
    }), 
    __metadata('design:paramtypes', [chat_service_1.ChatService])
], MessagesComponent);
exports.MessagesComponent = MessagesComponent;
//# sourceMappingURL=messages.component.js.map