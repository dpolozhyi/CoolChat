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
class SignalrWindow extends Window {
}
exports.SignalrWindow = SignalrWindow;
let ChatService = class ChatService {
    constructor(window, http) {
        this.window = window;
        this.http = http;
        this.startingSubject = new Subject_1.Subject();
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        if (this.window.$ === undefined || this.window.$.hubConnection === undefined) {
            throw new Error("The variable '$' or the .hubConnection() function are not defined...please check the SignalR scripts have been loaded properly");
        }
        this.starting$ = this.startingSubject.asObservable();
        this.hubConnection = this.window.$.hubConnection();
        this.hubConnection.url = this.window['hubConfig'].url;
        this.hubProxy = this.hubConnection.createHubProxy(this.window['hubConfig'].hubName);
        this.hubProxy.on("AddNewMessageToPage", (message) => {
            console.log(this.msgCallback);
            if (this.msgCallback) {
                this.msgCallback(message);
            }
        });
    }
    addMessageCallback(callback) {
        this.msgCallback = callback;
    }
    connect() {
        this.hubConnection.start().done(() => this.startingSubject.next()).fail((error) => this.startingSubject.error(error));
    }
    getChatRoomList() {
        return this.http.get('/chat/list').toPromise().then(data => data.json());
    }
    getMessages(chatRoom) {
        return this.http.get('/messages/' + chatRoom.Id + '?offset=0&limit=20').toPromise().then(data => data.json());
    }
    getEarlyMessages(chatRoomId, offset) {
        return this.http.get('/messages/' + chatRoomId + '?offset=' + offset + '&limit=10').toPromise().then(data => data.json());
    }
    sendMessage(message) {
        return this.http
            .post('/chat', JSON.stringify(message), { headers: this.headers })
            .toPromise()
            .then(res => res.json());
    }
    subscribe(chatId) {
        return this.hubProxy.invoke("JoinGroup", chatId);
    }
    unsubscribe(chatId) {
        return this.hubProxy.invoke("LeaveGroup", chatId);
    }
};
ChatService = __decorate([
    core_1.Injectable(),
    __param(0, core_1.Inject(SignalrWindow)), 
    __metadata('design:paramtypes', [SignalrWindow, http_1.Http])
], ChatService);
exports.ChatService = ChatService;
//# sourceMappingURL=chat.service.js.map