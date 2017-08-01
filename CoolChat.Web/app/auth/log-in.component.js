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
const router_1 = require('@angular/router');
var AuthState;
(function (AuthState) {
    AuthState[AuthState["Login"] = 0] = "Login";
    AuthState[AuthState["Register"] = 1] = "Register";
    AuthState[AuthState["None"] = 2] = "None";
})(AuthState || (AuthState = {}));
var FieldStatus;
(function (FieldStatus) {
    FieldStatus[FieldStatus["Undefined"] = 0] = "Undefined";
    FieldStatus[FieldStatus["Wrong"] = 1] = "Wrong";
    FieldStatus[FieldStatus["Satisfied"] = 2] = "Satisfied";
    FieldStatus[FieldStatus["Good"] = 3] = "Good";
})(FieldStatus || (FieldStatus = {}));
let LogInComponent = class LogInComponent {
    constructor(router, route) {
        this.router = router;
        this.logged = false;
        this.authState = AuthState;
        this.fieldType = FieldStatus;
        this.loading = false;
        this.state = AuthState.Login;
        this.passStatus = FieldStatus.Undefined;
        console.log(route.snapshot.data);
        if (route.snapshot.data['isRegistration']) {
            this.state = AuthState.Register;
        }
    }
    toLogin() {
        this.router.navigate(['login']);
    }
    toRegister() {
        this.router.navigate(['register']);
    }
    onLogin() {
        this.loading = true;
        setTimeout(() => this.loading = false, 3000);
    }
    onPasswordEnter(value) {
        if (value.length < 6 || !value.match(/\d+/g)) {
            this.passStatus = FieldStatus.Wrong;
            return;
        }
        if (!this.IsContainUpperLetter(value)) {
            this.passStatus = FieldStatus.Satisfied;
            return;
        }
        this.passStatus = FieldStatus.Good;
    }
    IsContainUpperLetter(string) {
        var i = 0;
        var character = '';
        while (i < string.length) {
            character = string.charAt(i++);
            if (!character.match(/\d+/g) && character == character.toUpperCase()) {
                return true;
            }
        }
        return false;
    }
};
LogInComponent = __decorate([
    core_1.Component({
        selector: 'div[log-in]',
        templateUrl: 'app/log-in/log-in.component.html',
        styleUrls: ['app/log-in/log-in.component.css']
    }), 
    __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute])
], LogInComponent);
exports.LogInComponent = LogInComponent;
//# sourceMappingURL=log-in.component.js.map