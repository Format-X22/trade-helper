import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import * as moment from 'moment';
import { AddTaskDto, TExplain } from './app.dto';
import { Task } from './app.model';
import { TOKEN } from './app.const';
import { Response } from 'express';

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
    private tasks: Map<Task['id'], Task> = new Map();

    async auth(res: Response, token: string): Promise<void> {
        if (token !== TOKEN) {
            throw new ForbiddenException();
        }

        res.cookie('token', token, {
            httpOnly: true,
            maxAge: moment.duration(7, 'days').as('ms'),
        });
    }

    async getLogs(): Promise<TLogs> {
        const length = this.logs.length;

        return this.logs.slice(length - 1000, length).reverse();
    }

    async addTask(config: AddTaskDto): Promise<void> {
        const task = new Task(config);

        this.tasks.set(task.id, task);
    }

    async cancelTask(id: number, cancelLong: boolean, cancelShort: boolean): Promise<void> {
        const task = this.tasks.get(id);

        if (!task) {
            throw new NotFoundException();
        }

        // TODO -

        if (cancelLong) {
            task.clearLong();
        }

        if (cancelShort) {
            task.clearShort();
        }

        if (!task.hasLong() && !task.hasShort()) {
            this.tasks.delete(id);
        }
    }

    async shutdown(): Promise<void> {
        // TODO -
    }

    async getExplain(): Promise<TExplain> {
        return Array.from(this.tasks.values()).map((i) => i.explain());
    }
}
