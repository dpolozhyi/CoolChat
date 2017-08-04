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
const core_1 = require("@angular/core");
require('rxjs/add/operator/toPromise');
const http_1 = require('@angular/http');
let AuthService = class AuthService {
    constructor(http) {
        this.http = http;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    registerUser(regModel) {
        return this.http.post('api/user', JSON.stringify(regModel), { headers: this.headers }).toPromise();
    }
    getToken(loginModel) {
        return this.http.post('api/token', JSON.stringify(loginModel), { headers: this.headers })
            .toPromise().then(res => {
            var token = res.json();
            localStorage.setItem('tokenKey', token);
            return token;
        });
    }
    isTokenExist() {
        return localStorage.getItem('tokenKey');
    }
    isTokenValid() {
        var token = localStorage.getItem('tokenKey');
        if (token) {
            return this.http.post('api/token/check', JSON.stringify(token), { headers: this.headers }).toPromise()
                .then(res => JSON.parse(res.json()).isValid);
        }
        return Promise.resolve(false);
    }
    logOut() {
        localStorage.removeItem('tokenKey');
    }
};
AuthService = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [http_1.Http])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map