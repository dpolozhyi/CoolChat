import { Component, ViewEncapsulation, Input, HostListener } from '@angular/core';

@Component({
    selector: 'div[app]',
    template: `
        <div class="header">
	        <span class="logo">CoolChat</span>
	        <span class="chat-list-ico" id="showChatList" (click)="minModeHiddenChatList = !minModeHiddenChatList"><i class="fa fa-bars" aria-hidden="true"></i></span>
        </div>
        <div class="main" chat-list (notifyChatListState)="onChatListStateChanged($event)" [minModeHiddenChatList]="minModeHiddenChatList"></div>    
    `
})
export class AppComponent {
    private minModeHiddenChatList: boolean = false;

    onChatListStateChanged(state: boolean) {
        this.minModeHiddenChatList = state;
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        const target = event.target;
        if (target.innerWidth > 767) {
            this.minModeHiddenChatList = true;
        }
    }
}