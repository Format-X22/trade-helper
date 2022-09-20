import { Injectable, Logger } from '@nestjs/common';
import * as moment from 'moment';
import { InjectModel } from '@nestjs/sequelize';
import { LoggerModel } from './logger.model';

export enum ELogType {
    LOG = 'LOG',
    WARN = 'WARN',
    ERROR = 'ERROR',
}

export type TLogs = Array<{
    type: ELogType;
    date: string;
    message: string;
}>;

const LOGS_LIMIT = 1000;
const DATE_FORMAT = 'DD MMM HH:mm:ss';

@Injectable()
export class LoggerService {
    private readonly nativeLogger: Logger = new Logger();

    constructor(@InjectModel(LoggerModel) public loggerModel: typeof LoggerModel) {}

    async log(message: string): Promise<void> {
        this.nativeLogger.log(message);
        await this.loggerModel.create({ type: ELogType.LOG, message });
    }

    async warn(message: string): Promise<void> {
        this.nativeLogger.warn(message);
        await this.loggerModel.create({ type: ELogType.WARN, message });
    }

    async error(message: string): Promise<void> {
        this.nativeLogger.error(message);
        await this.loggerModel.create({ type: ELogType.ERROR, message });
    }

    async getLogs(): Promise<TLogs> {
        const data = await this.loggerModel.findAll({
            limit: LOGS_LIMIT,
            attributes: ['type', 'message', 'createdAt'],
            order: [['id', 'DESC']],
        });

        if (!data) {
            return [];
        }

        return data.map((i) => {
            return {
                type: i.type,
                message: i.message,
                date: moment(i.createdAt).format(DATE_FORMAT),
            };
        });
    }
}
