import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './root/app.component';
import { ChatComponent } from './chat/chat.component';
import { ChatListComponent } from './chat-list/chat-list.component';
import { LogInComponent } from './log-in/log-in.component';

import { ChatService, SignalrWindow } from './shared/services/chat.service';

@NgModule({
    imports: [BrowserModule, FormsModule, HttpModule],
    declarations:
    [
        AppComponent,
        ChatComponent,
        ChatListComponent,
        LogInComponent
    ],
    providers:
    [
        ChatService,
        { provide: SignalrWindow, useValue: window }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }