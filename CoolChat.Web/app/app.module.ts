import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule }   from '@angular/router';

import { AppComponent } from './root/app.component';
import { MessagesComponent } from './messages/messages.component';
import { ChatListComponent } from './chat-list/chat-list.component';
import { ChatComponent } from './chat/chat.component';
import { LogInComponent } from './log-in/log-in.component';
import { LoadWaiterComponent } from './load-waiter/load-waiter.component';

import { ChatService, SignalrWindow } from './shared/services/chat.service';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot([
            //{ path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: 'login', component: LogInComponent },
            { path: 'register', component: LogInComponent, data: { isRegistration: true } },
            { path: 'messages', component: ChatComponent },
            { path: '', component: LoadWaiterComponent }
        ])
    ],
    declarations:
    [
        AppComponent,
        MessagesComponent,
        ChatListComponent,
        ChatComponent,
        LogInComponent,
        LoadWaiterComponent
    ],
    providers:
    [
        ChatService,
        { provide: SignalrWindow, useValue: window }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }