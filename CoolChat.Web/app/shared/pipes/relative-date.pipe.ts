import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({ name: 'relativeDate' })
export class RelativeDatePipe implements PipeTransform {
    constructor(private datePipe: DatePipe) { }

    transform(value: Date, args?: string[]): any {
        if (!value) return value;
        console.log("Inputs validated");
        var today = new Date();
        value = new Date(String(value));

        if (this.isOneDay(value, today)) {
            return this.datePipe.transform(value, 'shortTime');
        }

        if (this.isOneMonth(value, today)) {
            return this.datePipe.transform(value, 'mediumDate');
        }
    }

    isOneDay(date1: Date, date2: Date) {
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

    isOneMonth(date1: Date, date2: Date) {
        return date1.getMonth() === date2.getMonth() && date1.getFullYear() == date2.getFullYear();
    }
}