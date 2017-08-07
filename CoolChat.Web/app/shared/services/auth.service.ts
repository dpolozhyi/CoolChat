import {Injectable, Inject} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Rx";
import 'rxjs/add/operator/toPromise';
import { Headers, Http, Response } from '@angular/http';

import { LoginModel } from '../models/login.model';
import { RegisterModel } from '../models/register.model';
import { UserModel } from '../models/user.model';

@Injectable()
export class AuthService {

    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) { }

    registerUser(regModel: RegisterModel): Promise<Response> {
        return this.http.post('api/user', JSON.stringify(regModel), { headers: this.headers } ).toPromise();
    }

    getToken(loginModel: LoginModel): Promise<string> {
        return this.http.post('api/token', JSON.stringify(loginModel), { headers: this.headers })
            .toPromise().then(res => {
                var token = res.json() as string;
                localStorage.setItem('tokenKey', token);
                return token;
            });
    }

    getLocalToken(): string {
        return localStorage.getItem("tokenKey");
    }

    getUser(): Promise<UserModel> {
        var token = localStorage.getItem("tokenKey");
        if (token && this.isTokenValid()) {
            this.headers.delete("Authorization");
            this.headers.append("Authorization", token);
            return this.http.get('api/user', { headers: this.headers }).toPromise().then(res => JSON.parse(res.json()) as UserModel);
        }
    }

    isTokenExist(): boolean {
        return localStorage.getItem('tokenKey');
    }

    isTokenValid(): Promise<boolean> {
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
}