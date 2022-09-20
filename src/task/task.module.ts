import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { TaskModel } from './task.model';
import { LoggerModule } from '../logger/logger.module';

@Module({
    imports: [LoggerModule, SequelizeModule.forFeature([TaskModel])],
    providers: [TaskService],
    exports: [TaskService],
})
export class TaskModule {}
