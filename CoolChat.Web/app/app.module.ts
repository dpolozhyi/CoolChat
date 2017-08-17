import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule }   from '@angular/router';

import { AppComponent } from './root/app.component';
import { MessagesComponent } from './messages/messages.component';
import { ChatListComponent } from './chat-list/chat-list.component';
import { ChatComponent } from './chat/chat.component';
import { AuthComponent } from './auth/auth.component';
import { LoadWaiterComponent } from './load-waiter/load-waiter.component';

import { ChatService, SignalrWindow } from './shared/services/chat.service';
import { AuthService } from './shared/services/auth.service';

import { FocusDirective } from './shared/directives/focus.directive';
import { LetterAvatarDirective } from './shared/directives/letter-avatar.directive';

import { DatePipe } from '@angular/common';
import { RelativeDatePipe} from "./shared/pipes/relative-date.pipe";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot([
            //{ path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: 'login', component: AuthComponent },
            { path: 'register', component: AuthComponent, data: { isRegistration: true } },
            { path: 'dialogs', component: ChatComponent },
            { path: '', component: LoadWaiterComponent }
        ])
    ],
    declarations:
    [
        AppComponent,
        MessagesComponent,
        ChatListComponent,
        ChatComponent,
        AuthComponent,
        LoadWaiterComponent,
        RelativeDatePipe,
        FocusDirective,
        LetterAvatarDirective
    ],
    providers:
    [
        ChatService,
        { provide: SignalrWindow, useValue: window },
        AuthService,
        DatePipe
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }