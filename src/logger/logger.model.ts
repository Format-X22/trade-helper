import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ELogType } from './logger.service';

@Table
export class LoggerModel extends Model {
    @Column(DataType.STRING)
    type: ELogType;

    @Column(DataType.TEXT)
    message: string;
}
