import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { LoggerModel } from './logger.model';

@Module({
    imports: [SequelizeModule.forFeature([LoggerModel])],
    providers: [LoggerService],
    exports: [LoggerService],
})
export class LoggerModule {}
