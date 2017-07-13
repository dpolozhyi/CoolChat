import {Component, ElementRef, Injectable, Inject} from '@angular/core';

@Injectable()
export class UIService {

    private hideButton;

    constructor(public element: ElementRef) {
        this.hideButton = this.element.nativeElement.querySelector('.chat-list');
    }
}