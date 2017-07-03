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
require('rxjs/add/operator/toPromise');
const http_1 = require('@angular/http');
class SignalrWindow extends Window {
}
exports.SignalrWindow = SignalrWindow;
let ChatService = class ChatService {
    constructor(window, http) {
        this.window = window;
        this.http = http;
        if (this.window.$ === undefined || this.window.$.hubConnection === undefined) {
            throw new Error("The variable '$' or the .hubConnection() function are not defined...please check the SignalR scripts have been loaded properly");
        }
        this.hubConnection = this.window.$.hubConnection();
        console.log("GOT HUB CONNECTION");
        console.log(this.hubConnection);
        this.hubConnection.url = 'http://localhost:38313/signalr';
        this.hubProxy = this.hubConnection.createHubProxy('chatHub');
        this.hubProxy.on("AddNewMessageToPage", (message) => {
            console.log('New message came to service');
            console.log(this.msgCallback);
            if (this.msgCallback) {
                this.msgCallback(message);
            }
        });
        this.hubConnection.start()
            .done(function () {
            console.log("GOT HUB CONNECTION");
            console.log(this.hubConnection);
            console.log('Now connected, connection ID=' + this.hubConnection.id);
        });
    }
    addMessageCallback(callback) {
        console.log("Received callback for message");
        this.msgCallback = callback;
        console.log(this.msgCallback);
    }
    sendMessageToEverybody() {
        console.log("Sending message from service");
        this.hubProxy.invoke("NewContosoChatMessage", "HI ALL");
    }
    getChatRoomList() {
        return this.http.get('/chat/list').toPromise().then(data => data.json());
    }
    getMessages(chatRoom) {
        return this.http.get('/chat/' + chatRoom.Name).toPromise().then(data => data.json().Messages);
    }
};
ChatService = __decorate([
    core_1.Injectable(),
    __param(0, core_1.Inject(SignalrWindow)), 
    __metadata('design:paramtypes', [SignalrWindow, http_1.Http])
], ChatService);
exports.ChatService = ChatService;
//# sourceMappingURL=chat.service.js.map