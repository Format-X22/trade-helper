import { Injectable } from '@nestjs/common';
import * as moment from 'moment';

export type TLogs = Array<{
    isInfo?: true;
    isWarn?: true;
    isError?: true;
    date: string;
    message: string;
}>;

@Injectable()
export class AppService {
    private logs: TLogs = [
        // TODO Demo
        { isInfo: true, date: moment().format('DD MMM HH:mm:ss'), message: 'Info test log' },
        { isWarn: true, date: moment().format('DD MMM HH:mm:ss'), message: 'Warn test log' },
        { isError: true, date: moment().format('DD MMM HH:mm:ss'), message: 'Error test log' },
        { isInfo: true, date: moment().format('DD MMM HH:mm:ss'), message: 'Info test log' },
        { isWarn: true, date: moment().format('DD MMM HH:mm:ss'), message: 'Warn test log' },
        { isError: true, date: moment().format('DD MMM HH:mm:ss'), message: 'Error test log' },
        { isInfo: true, date: moment().format('DD MMM HH:mm:ss'), message: 'Info test log' },
        { isWarn: true, date: moment().format('DD MMM HH:mm:ss'), message: 'Warn test log' },
        { isError: true, date: moment().format('DD MMM HH:mm:ss'), message: 'Error test log' },
        { isInfo: true, date: moment().format('DD MMM HH:mm:ss'), message: 'Info test log' },
        { isWarn: true, date: moment().format('DD MMM HH:mm:ss'), message: 'Warn test log' },
        { isError: true, date: moment().format('DD MMM HH:mm:ss'), message: 'Error test log' },
        { isInfo: true, date: moment().format('DD MMM HH:mm:ss'), message: 'Info test log' },
        { isWarn: true, date: moment().format('DD MMM HH:mm:ss'), message: 'Warn test log' },
        { isError: true, date: moment().format('DD MMM HH:mm:ss'), message: 'Error test log' },
        { isInfo: true, date: moment().format('DD MMM HH:mm:ss'), message: 'Info test log' },
        { isWarn: true, date: moment().format('DD MMM HH:mm:ss'), message: 'Warn test log' },
        { isError: true, date: moment().format('DD MMM HH:mm:ss'), message: 'Error test log' },
        { isInfo: true, date: moment().format('DD MMM HH:mm:ss'), message: 'Info test log' },
        { isWarn: true, date: moment().format('DD MMM HH:mm:ss'), message: 'Warn test log' },
        { isError: true, date: moment().format('DD MMM HH:mm:ss'), message: 'Error test log' },
        { isInfo: true, date: moment().format('DD MMM HH:mm:ss'), message: 'Info test log' },
        { isWarn: true, date: moment().format('DD MMM HH:mm:ss'), message: 'Warn test log' },
        { isError: true, date: moment().format('DD MMM HH:mm:ss'), message: 'Error test log' },
    ];

    async getLogs(): Promise<TLogs> {
        const length = this.logs.length;

        return this.logs.slice(length - 1000, length).reverse();
    }

    async shutdown(): Promise<void> {
        // TODO -
    }
}
