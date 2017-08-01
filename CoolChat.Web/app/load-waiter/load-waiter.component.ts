import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'div[load-waiter]',
    templateUrl: 'app/load-waiter/load-waiter.component.html',
    styleUrls: ['app/load-waiter/load-waiter.component.css']
})
export class LoadWaiterComponent implements OnInit {

    constructor(private router: Router) { }

    ngOnInit() {
        setTimeout(() => this.router.navigate(['login']), 2000);
    }
}