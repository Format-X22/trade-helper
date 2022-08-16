import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { AddTaskDto, TExplain } from './app.dto';
import { Task } from './app.model';

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
    private tasks: Array<Task> = [];

    async getLogs(): Promise<TLogs> {
        const length = this.logs.length;

        return this.logs.slice(length - 1000, length).reverse();
    }

    async addTask(config: AddTaskDto): Promise<void> {
        this.tasks.push(new Task(config));
    }

    async shutdown(): Promise<void> {
        // TODO -
    }

    async getExplain(): Promise<TExplain> {
        return this.tasks.map((i) => i.explain());
    }
}
