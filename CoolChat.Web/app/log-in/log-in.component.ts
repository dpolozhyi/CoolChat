import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { ChatService } from '../shared/services/chat.service';

import { ChatRoomModel } from '../shared/models/chatroom.model';

@Component({
    selector: 'div[log-in]',
    templateUrl: 'app/log-in/log-in.component.html',
    styleUrls: ['app/log-in/log-in.component.css']
})
export class LogInComponent {

}