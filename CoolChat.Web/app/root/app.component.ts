import { Component, ViewEncapsulation, Input, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'div[app]',
    templateUrl: 'app/root/app.component.html',
    styleUrls: ['app/root/app.component.css']
})
export class AppComponent implements OnInit {

    constructor(private router: Router) { }

    ngOnInit() {
        this.router.events.subscribe((event) => {
            console.log(event);
            this.router.navigate['messages'];
        })
    }
}