import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

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

    await app.listen(3000);
}
bootstrap();
