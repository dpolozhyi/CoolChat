import {Injectable, Inject} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Rx";
import 'rxjs/add/operator/toPromise';
import { Headers, Http } from '@angular/http';

import { ChatRoomModel } from '../models/chatroom.model';
import { MessageModel } from '../models/message.model';

export class SignalrWindow extends Window {
    $: any;
}

declare type MessageCallback = (message: string) => void;


@Injectable()
export class ChatService {

    // These are used to track the internal SignalR state 
    //
    private hubConnection: any;
    private hubProxy: any;

    private msgCallback: MessageCallback;

    constructor(
        @Inject(SignalrWindow) private window: SignalrWindow,
        private http: Http
    ) {
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
            })

    }

    addMessageCallback(callback: MessageCallback) {
        console.log("Received callback for message");
        this.msgCallback = callback;
        console.log(this.msgCallback);
    }

    sendMessageToEverybody() {
        console.log("Sending message from service");
        this.hubProxy.invoke("NewContosoChatMessage", "HI ALL")
    }

    getChatRoomList(): Promise<ChatRoomModel[]> {
        return this.http.get('/chat/list').toPromise().then(data => data.json() as ChatRoomModel[]);
    }

    getMessages(chatRoom: ChatRoomModel): Promise<MessageModel[]> {
        return this.http.get('/chat/' + chatRoom.Name).toPromise().then(data => data.json().Messages as MessageModel[]);
    }
}