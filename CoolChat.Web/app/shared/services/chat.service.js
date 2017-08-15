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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
const core_1 = require("@angular/core");
const Subject_1 = require("rxjs/Subject");
require('rxjs/add/operator/toPromise');
const http_1 = require('@angular/http');
const auth_service_1 = require('./auth.service');
class SignalrWindow extends Window {
}
exports.SignalrWindow = SignalrWindow;
let ChatService = class ChatService {
    constructor(window, http, authService) {
        this.window = window;
        this.http = http;
        this.authService = authService;
        this.startingSubject = new Subject_1.Subject();
        this.newMessageSubject = new Subject_1.Subject();
        this.readedMessagesSubject = new Subject_1.Subject();
        this.lastActivitySubject = new Subject_1.Subject();
        this.isTypingSubject = new Subject_1.Subject();
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        if (this.window.$ === undefined || this.window.$.hubConnection === undefined) {
            throw new Error("The variable '$' or the .hubConnection() function are not defined...please check the SignalR scripts have been loaded properly");
        }
        this.authService.getUser().then((user) => this.user = user);
        this.starting$ = this.startingSubject.asObservable();
        this.newMessage$ = this.newMessageSubject.asObservable();
        this.readedMessages$ = this.readedMessagesSubject.asObservable();
        this.userLastActivity$ = this.lastActivitySubject.asObservable();
        this.isTyping$ = this.isTypingSubject.asObservable();
        this.hubConnection = this.window.$.hubConnection();
        this.hubConnection.url = this.window['hubConfig'].url;
        this.hubProxy = this.hubConnection.createHubProxy(this.window['hubConfig'].hubName);
        this.hubProxy.on("AddNewMessage", (message) => {
            console.log(this.msgCallback);
            this.newMessageSubject.next(JSON.parse(message));
            if (this.msgCallback) {
                this.msgCallback(message);
            }
        });
        this.hubProxy.on("ReadedMessages", (dialogId) => {
            console.log(dialogId);
            this.readedMessagesSubject.next(dialogId);
        });
        this.hubProxy.on("UserIsOnline", (user) => {
            this.lastActivitySubject.next(JSON.parse(user));
        });
        this.hubProxy.on("IsTyping", (typing) => {
            this.isTypingSubject.next(typing);
        });
        this.hubConnection.start()
            .done(() => this.startingSubject.next())
            .fail((error) => this.startingSubject.error(error));
    }
    addMessageCallback(callback) {
        this.msgCallback = callback;
    }
    addOnlineCallback(callback) {
        this.onlineCallback = callback;
    }
    getUserAccount() {
        if (this.setAuthHeader()) {
            return this.http.post('/api/useraccount', '', { headers: this.headers }).toPromise().then(res => {
                this.setLastTimeActivity();
                return JSON.parse(res.json());
            });
        }
    }
    getMessages(dialogId) {
        if (this.setAuthHeader()) {
            this.setLastTimeActivity();
            return this.http.get('api/messages/' + dialogId, { headers: this.headers }).toPromise().then(data => JSON.parse(data.json()));
        }
    }
    /*getMessages(chatRoom: ChatRoomModel): Promise<MessageModel[]> {
        return this.http.get('/messages/' + chatRoom.Id + '?offset=0&limit=20').toPromise().then(data => data.json() as MessageModel[]);
    }

    getEarlyMessages(chatRoomId: number, offset: number): Promise<MessageModel[]> {
        return this.http.get('/messages/' + chatRoomId + '?offset=' + offset + '&limit=10').toPromise().then(data => data.json() as MessageModel[]);
    }*/
    sendMessage(message) {
        if (this.setAuthHeader()) {
            this.setLastTimeActivity();
            return this.http
                .post('api/messages/send', JSON.stringify(message), { headers: this.headers })
                .toPromise()
                .then(res => JSON.parse(res.json()));
        }
    }
    setMessagesAsReaded(dialogId) {
        if (this.setAuthHeader()) {
            this.setLastTimeActivity();
            return this.http
                .post('api/messages/read', dialogId, { headers: this.headers }).toPromise();
        }
    }
    setLastTimeActivity() {
        if (this.setAuthHeader()) {
            return this.http
                .post('api/useraccount/lastactivity', '', { headers: this.headers }).toPromise().then(res => res.json());
        }
    }
    setAuthHeader() {
        var token = this.authService.getLocalToken();
        if (token) {
            this.headers.delete("Authorization");
            this.headers.append("Authorization", token);
            return true;
        }
        return false;
    }
    isTyping(dialogId, userId) {
        this.hubProxy.invoke("IsTyping", dialogId, userId);
    }
    subscribe(dialogIds) {
        dialogIds.forEach((dialog) => this.hubProxy.invoke("JoinGroup", dialog));
    }
    unsubscribe(dialogIds) {
        //return this.hubProxy.invoke("LeaveGroup", userId);
    }
};
ChatService = __decorate([
    core_1.Injectable(),
    __param(0, core_1.Inject(SignalrWindow)), 
    __metadata('design:paramtypes', [SignalrWindow, http_1.Http, auth_service_1.AuthService])
], ChatService);
exports.ChatService = ChatService;
//# sourceMappingURL=chat.service.js.map