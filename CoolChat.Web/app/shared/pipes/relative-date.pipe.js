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
const common_1 = require('@angular/common');
let RelativeDatePipe = class RelativeDatePipe {
    constructor(datePipe) {
        this.datePipe = datePipe;
    }
    transform(date, args) {
        if (!date)
            return date;
        console.log("Inputs validated");
        var now = new Date();
        date = new Date(String(date));
        if (date.getFullYear() != now.getFullYear()) {
            return this.datePipe.transform(date, 'mediumDate');
        }
        if (date.getMonth() != now.getMonth()) {
            return this.datePipe.transform(date, 'MMMd');
        }
        if (now.getDay() - date.getDay() == 1 || (date.getDay() == 7 && now.getDay() == 1)) {
            return 'Yesterday';
        }
        var sevenDaysTicks = 1000 * 60 * 60 * 24 * 7;
        if (now.getTime() - date.getTime() <= sevenDaysTicks && now.getDay() != date.getDay()) {
            return this.datePipe.transform(date, 'EEEE');
        }
        return this.datePipe.transform(date, 'shortTime');
    }
    isOneDay(date1, date2) {
        console.log("Day");
        console.log(date1.getDay());
        console.log("Month");
        console.log(date1.getMonth());
        console.log("Year");
        console.log(date1.getFullYear());
        return date1.getDay() === date2.getDay() && date1.getMonth() === date2.getMonth() && date1.getFullYear() == date2.getFullYear();
    }
    /*isOneWeek(date1: Date, date2: Date) {
        return date1.getMonth() === date2.getMonth() && date1.getFullYear() == date2.getFullYear() && date1.
    }*/
    isOneMonth(date1, date2) {
        return date1.getMonth() === date2.getMonth() && date1.getFullYear() == date2.getFullYear();
    }
};
RelativeDatePipe = __decorate([
    core_1.Pipe({ name: 'relativeDate' }), 
    __metadata('design:paramtypes', [common_1.DatePipe])
], RelativeDatePipe);
exports.RelativeDatePipe = RelativeDatePipe;
//# sourceMappingURL=relative-date.pipe.js.map