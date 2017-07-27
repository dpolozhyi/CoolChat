"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require('@angular/core');
var AuthState;
(function (AuthState) {
    AuthState[AuthState["Login"] = 0] = "Login";
    AuthState[AuthState["Register"] = 1] = "Register";
    AuthState[AuthState["None"] = 2] = "None";
})(AuthState || (AuthState = {}));
let LogInComponent = class LogInComponent {
    constructor() {
        this.logged = false;
        this.authState = AuthState;
        this.loading = false;
        this.state = AuthState.Login;
    }
    onRegister() {
        this.state = AuthState.Register;
    }
    onLogin() {
        this.loading = true;
        setTimeout(() => this.loading = false, 3000);
    }
};
LogInComponent = __decorate([
    core_1.Component({
        selector: 'div[log-in]',
        templateUrl: 'app/log-in/log-in.component.html',
        styleUrls: ['app/log-in/log-in.component.css']
    }), 
    __metadata('design:paramtypes', [])
], LogInComponent);
exports.LogInComponent = LogInComponent;
//# sourceMappingURL=log-in.component.js.map