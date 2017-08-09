import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({ name: 'relativeDate' })
export class RelativeDatePipe implements PipeTransform {
    constructor(private datePipe: DatePipe) { }

    transform(date: Date, args?: string[]): any {
        if (!date) return date;
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