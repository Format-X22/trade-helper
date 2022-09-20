import { ForbiddenException, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import * as moment from 'moment';
import { AddTaskDto } from './app.dto';
import { TOKEN } from './app.const';
import { Response } from 'express';
import { LoggerService, TLogs } from './logger/logger.service';
import { TaskService } from './task/task.service';
import { TaskModel } from './task/task.model';

@Injectable()
export class AppService implements OnApplicationBootstrap {
    constructor(private logger: LoggerService, private taskService: TaskService) {}

    async onApplicationBootstrap(): Promise<void> {
        await this.logger.log('Started!');
    }

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
        return this.logger.getLogs();
    }

    async addTask(config: AddTaskDto): Promise<void> {
        await this.taskService.addTask(config);
    }

    async cancelTask(id: number): Promise<void> {
        await this.taskService.cancel(id);
    }

    async shutdown(): Promise<void> {
        await this.logger.log('Shutdown...');
        await this.taskService.shutdown();
        await this.logger.log('Shutdown done!');
        
        process.exit(0);
    }

    async getExplain(): Promise<Array<TaskModel>> {
        return this.taskService.getExplain();
    }
}
