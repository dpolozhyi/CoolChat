import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../shared/services/auth.service';

@Component({
    selector: 'div[load-waiter]',
    templateUrl: 'app/load-waiter/load-waiter.component.html',
    styleUrls: ['app/load-waiter/load-waiter.component.css']
})
export class LoadWaiterComponent implements OnInit {

    constructor(private router: Router, private authService: AuthService) { }

    ngOnInit() {
        this.authService.isTokenValid().then(valid => {
            if (valid) {
                setTimeout(() => this.router.navigate(['messages']), 1000);
            }
            else {
                setTimeout(() => this.router.navigate(['messages']), 1000);
            }
        });
    }
}