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

declare type OnlineCallback = (userId: number, isOnline: boolean) => void;
declare type MessageCallback = (message: MessageModel) => void;


@Injectable()
export class ChatService {

    // These are used to track the internal SignalR state 
    //
    private hubConnection: any;
    private hubProxy: any;

    starting$: Observable<any>;

    newMessage$: Observable<any>;

    readedMessages$: Observable<any>;

    private startingSubject = new Subject<any>();

    private newMessageSubject = new Subject<MessageModel>();

    private readedMessagesSubject = new Subject<number>();

    private msgCallback: MessageCallback;

    private onlineCallback: OnlineCallback;

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
        this.newMessage$ = this.newMessageSubject.asObservable();
        this.readedMessages$ = this.readedMessagesSubject.asObservable();

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
        this.hubProxy.on("UserIsOnline", (userId, isOnline) => {
            console.log(this.msgCallback);
            if (this.onlineCallback) {
                this.onlineCallback(userId, isOnline);
            }
        });
        this.hubConnection.start()
            .done(() => this.startingSubject.next())
            .fail((error) => this.startingSubject.error(error));
    }

    addMessageCallback(callback: MessageCallback) {
        this.msgCallback = callback;
    }

    addOnlineCallback(callback: OnlineCallback) {
        this.onlineCallback = callback;
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
    }*/

    sendMessage(message: MessageModel): Promise<MessageModel> {
        var token = this.authService.getLocalToken();
        if (token && this.authService.isTokenValid()) {
            this.headers.delete("Authorization");
            this.headers.append("Authorization", token);
            return this.http
                .post('api/messages/send', JSON.stringify(message), { headers: this.headers })
                .toPromise()
                .then(res => JSON.parse(res.json()) as MessageModel);
        }
    }

    setMessagesAsReaded(dialogId: number) {
        var token = this.authService.getLocalToken();
        if (token) {
            this.headers.delete("Authorization");
            this.headers.append("Authorization", token);
            return this.http
                .post('api/messages/read', dialogId, { headers: this.headers }).toPromise();
        }

    }

    subscribe(dialogIds: number[]): void {
        dialogIds.forEach((dialog) => this.hubProxy.invoke("JoinGroup", dialog));
    }

    unsubscribe(dialogIds: number[]): void {
        //return this.hubProxy.invoke("LeaveGroup", userId);
    }
}