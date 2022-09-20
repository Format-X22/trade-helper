import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { LoggerModel } from './logger/logger.model';
import { TaskModel } from './task/task.model';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.setBaseViewsDir(join(__dirname, '..', 'views'));
    app.setViewEngine('pug');
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            transformOptions: {
                enableImplicitConversion: true,
            },
        }),
    );
    app.use(cookieParser());

    const syncOptions = { alter: { drop: false } };

    await LoggerModel.sync(syncOptions);
    await TaskModel.sync(syncOptions);

    await app.listen(3000);
}
bootstrap();
