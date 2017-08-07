import {Injectable, Inject} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Rx";
import 'rxjs/add/operator/toPromise';
import { Headers, Http } from '@angular/http';

import { AuthService } from './auth.service';

import { UserModel } from '../models/user.model';
import { UserAccountModel } from '../models/user-account.model';
import { MessageModel } from '../models/message.model';

export class SignalrWindow extends Window {
    $: any;
}

declare type MessageCallback = (message: MessageModel) => void;


@Injectable()
export class ChatService {

    // These are used to track the internal SignalR state 
    //
    private hubConnection: any;
    private hubProxy: any;

    starting$: Observable<any>;

    private startingSubject = new Subject<any>();

    private msgCallback: MessageCallback;

    private user: UserModel;

    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(
        @Inject(SignalrWindow) private window: SignalrWindow,
        private http: Http,
        private authService: AuthService
    ) {
        if (this.window.$ === undefined || this.window.$.hubConnection === undefined) {
            throw new Error("The variable '$' or the .hubConnection() function are not defined...please check the SignalR scripts have been loaded properly");
        }

        this.authService.getUser().then((user: UserModel) => this.user = user);

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

    addMessageCallback(callback: MessageCallback) {
        this.msgCallback = callback;
    }

    connect() {
        this.hubConnection.start().done(() => this.startingSubject.next()).fail((error) => this.startingSubject.error(error));
    }

    getUserAccount(): Promise<UserAccountModel> {
        var token = this.authService.getLocalToken();
        if (token && this.authService.isTokenValid()) {
            this.headers.delete("Authorization");
            this.headers.append("Authorization", token);
            return this.http.post('/api/useraccount', '', { headers: this.headers }).toPromise().then(res => JSON.parse(res.json()) as UserAccountModel);
        }
    }

    getMessages(dialogId: number): Promise<MessageModel[]> {
        var token = this.authService.getLocalToken();
        if (token && this.authService.isTokenValid()) {
            this.headers.delete("Authorization");
            this.headers.append("Authorization", token);
            return this.http.get('api/messages/' + dialogId, { headers: this.headers }).toPromise().then(data => JSON.parse(data.json()) as MessageModel[]);
        }
    }
    
    /*getMessages(chatRoom: ChatRoomModel): Promise<MessageModel[]> {
        return this.http.get('/messages/' + chatRoom.Id + '?offset=0&limit=20').toPromise().then(data => data.json() as MessageModel[]);
    }

    getEarlyMessages(chatRoomId: number, offset: number): Promise<MessageModel[]> {
        return this.http.get('/messages/' + chatRoomId + '?offset=' + offset + '&limit=10').toPromise().then(data => data.json() as MessageModel[]);
    }

    sendMessage(message: MessageModel): Promise<MessageModel> {
        return this.http
            .post('/chat', JSON.stringify(message), { headers: this.headers })
            .toPromise()
            .then(res => res.json() as MessageModel);
    }*/

    subscribe(chatId: string): Promise<void> {
        return this.hubProxy.invoke("JoinGroup", chatId);
    }

    unsubscribe(chatId: string): Promise<void> {
        return this.hubProxy.invoke("LeaveGroup", chatId);
    }
}