import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { LoggerModule } from './logger/logger.module';
import { TaskModule } from './task/task.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { LoggerModel } from './logger/logger.model';
import { TaskModel } from './task/task.model';

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'public'),
        }),
        LoggerModule,
        TaskModule,
        SequelizeModule.forRoot({
            dialect: 'sqlite',
            storage: './db.sqlite3',
            models: [LoggerModel, TaskModel],
            logging: false,
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
