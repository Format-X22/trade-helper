import { Injectable, NotFoundException } from '@nestjs/common';
import { AddTaskDto } from '../app.dto';
import { LoggerService } from '../logger/logger.service';
import { InjectModel } from '@nestjs/sequelize';
import { TaskModel } from './task.model';

@Injectable()
export class TaskService {
    constructor(private logger: LoggerService, @InjectModel(TaskModel) private taskModel: typeof TaskModel) {}

    async getExplain(): Promise<Array<TaskModel>> {
        const tasks = await this.taskModel.findAll({ raw: true });

        return tasks || [];
    }

    async addTask(config: AddTaskDto): Promise<void> {
        const data = {
            stock: config.stock,
            type: config.type,
            side: config.side,
            fib0: config.fib0,
            fib1: config.fib1,
            amount: config.amount,
            cancelPrice: config.cancelPrice,
            cancelTime: config.cancelTime,
        };

        // TODO -

        await this.taskModel.create(data);
    }

    async cancel(id: number): Promise<void> {
        const task = await this.taskModel.findByPk(id);

        if (!task) {
            throw new NotFoundException();
        }

        // TODO -
    }

    async shutdown(): Promise<void> {
        // TODO -
    }
}
