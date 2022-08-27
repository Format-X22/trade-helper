import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { AddTaskDto, TExplain } from './app.dto';
import { Task } from './app.model';

enum ELogType {
    INFO = 'INFO',
    WARN = 'WARN',
    ERROR = 'ERROR',
}

export type TLogs = Array<{
    type: ELogType;
    date: string;
    message: string;
}>;

@Injectable()
export class AppService {
    private logs: TLogs = [
        // TODO Demo
        { type: ELogType.INFO, date: moment().format('DD MMM HH:mm:ss'), message: 'Info test log' },
        { type: ELogType.WARN, date: moment().format('DD MMM HH:mm:ss'), message: 'Warn test log' },
        { type: ELogType.ERROR, date: moment().format('DD MMM HH:mm:ss'), message: 'Error test log' },
        { type: ELogType.INFO, date: moment().format('DD MMM HH:mm:ss'), message: 'Info test log' },
        { type: ELogType.WARN, date: moment().format('DD MMM HH:mm:ss'), message: 'Warn test log' },
        { type: ELogType.ERROR, date: moment().format('DD MMM HH:mm:ss'), message: 'Error test log' },
        { type: ELogType.INFO, date: moment().format('DD MMM HH:mm:ss'), message: 'Info test log' },
        { type: ELogType.WARN, date: moment().format('DD MMM HH:mm:ss'), message: 'Warn test log' },
        { type: ELogType.ERROR, date: moment().format('DD MMM HH:mm:ss'), message: 'Error test log' },
        { type: ELogType.INFO, date: moment().format('DD MMM HH:mm:ss'), message: 'Info test log' },
        { type: ELogType.WARN, date: moment().format('DD MMM HH:mm:ss'), message: 'Warn test log' },
        { type: ELogType.ERROR, date: moment().format('DD MMM HH:mm:ss'), message: 'Error test log' },
        { type: ELogType.INFO, date: moment().format('DD MMM HH:mm:ss'), message: 'Info test log' },
        { type: ELogType.WARN, date: moment().format('DD MMM HH:mm:ss'), message: 'Warn test log' },
        { type: ELogType.ERROR, date: moment().format('DD MMM HH:mm:ss'), message: 'Error test log' },
        { type: ELogType.INFO, date: moment().format('DD MMM HH:mm:ss'), message: 'Info test log' },
        { type: ELogType.WARN, date: moment().format('DD MMM HH:mm:ss'), message: 'Warn test log' },
        { type: ELogType.ERROR, date: moment().format('DD MMM HH:mm:ss'), message: 'Error test log' },
        { type: ELogType.INFO, date: moment().format('DD MMM HH:mm:ss'), message: 'Info test log' },
        { type: ELogType.WARN, date: moment().format('DD MMM HH:mm:ss'), message: 'Warn test log' },
        { type: ELogType.ERROR, date: moment().format('DD MMM HH:mm:ss'), message: 'Error test log' },
        { type: ELogType.INFO, date: moment().format('DD MMM HH:mm:ss'), message: 'Info test log' },
        { type: ELogType.WARN, date: moment().format('DD MMM HH:mm:ss'), message: 'Warn test log' },
        { type: ELogType.ERROR, date: moment().format('DD MMM HH:mm:ss'), message: 'Error test log' },
    ];
    private tasks: Array<Task> = [];

    async getLogs(): Promise<TLogs> {
        const length = this.logs.length;

        return this.logs.slice(length - 1000, length).reverse();
    }

    async addTask(config: AddTaskDto): Promise<void> {
        this.tasks.push(new Task(config));
    }

    async cancelTask(id: number, isLong: boolean, isShort: boolean): Promise<void> {
        // TODO -
    }

    async shutdown(): Promise<void> {
        // TODO -
    }

    async getExplain(): Promise<TExplain> {
        return this.tasks.map((i) => i.explain());
    }
}
