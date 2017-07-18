import { Component, ViewEncapsulation, Input, HostListener, OnInit } from '@angular/core';

@Component({
    selector: 'div[app]',
    templateUrl: 'app/root/app.component.html',
    styleUrls: ['app/root/app.component.css']
})
export class AppComponent implements OnInit{
    private minModeHiddenChatList: boolean = false;

    ngOnInit() {
        this.handleViewPortWidth(window.innerWidth);
    }

    handleViewPortWidth(width) {
        if (width > 767) {
            this.minModeHiddenChatList = true;
        }
        else {
            this.minModeHiddenChatList = false;
        }
    }

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