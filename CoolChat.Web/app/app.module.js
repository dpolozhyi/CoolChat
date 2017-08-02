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
const platform_browser_1 = require('@angular/platform-browser');
const forms_1 = require('@angular/forms');
const http_1 = require('@angular/http');
const router_1 = require('@angular/router');
const app_component_1 = require('./root/app.component');
const messages_component_1 = require('./messages/messages.component');
const chat_list_component_1 = require('./chat-list/chat-list.component');
const chat_component_1 = require('./chat/chat.component');
const auth_component_1 = require('./auth/auth.component');
const load_waiter_component_1 = require('./load-waiter/load-waiter.component');
const chat_service_1 = require('./shared/services/chat.service');
const auth_service_1 = require('./shared/services/auth.service');
let AppModule = class AppModule {
};
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            router_1.RouterModule.forRoot([
                //{ path: '', redirectTo: 'login', pathMatch: 'full' },
                { path: 'login', component: auth_component_1.AuthComponent },
                { path: 'register', component: auth_component_1.AuthComponent, data: { isRegistration: true } },
                { path: 'messages', component: chat_component_1.ChatComponent },
                { path: '', component: chat_component_1.ChatComponent }
            ])
        ],
        declarations: [
            app_component_1.AppComponent,
            messages_component_1.MessagesComponent,
            chat_list_component_1.ChatListComponent,
            chat_component_1.ChatComponent,
            auth_component_1.AuthComponent,
            load_waiter_component_1.LoadWaiterComponent
        ],
        providers: [
            chat_service_1.ChatService,
            { provide: chat_service_1.SignalrWindow, useValue: window },
            auth_service_1.AuthService
        ],
        bootstrap: [app_component_1.AppComponent]
    }), 
    __metadata('design:paramtypes', [])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map