import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ESide, EState, EStock, EType } from './task.enum';

// TODO Cancel prices for all orders
// TODO Microprofit order
// TODO Do not display extra fibs

@Table
export class TaskModel extends Model {
    @Column(DataType.STRING)
    stock: EStock;

    @Column(DataType.STRING)
    type: EType;

    @Column(DataType.STRING)
    side: ESide;

    @Column(DataType.REAL)
    amount: number;

    @Column(DataType.STRING)
    state: EState;

    @Column(DataType.REAL)
    fib0: number;

    @Column(DataType.REAL)
    fib1: number;

    @Column(DataType.REAL)
    cancelPrice: number;

    @Column(DataType.DATE)
    cancelTime: Date;

    @Column(DataType.STRING)
    orderEnterId: string;

    @Column(DataType.REAL)
    orderEnterPrice: number;

    @Column(DataType.REAL)
    orderEnterAmount: number;

    @Column(DataType.BOOLEAN)
    orderEnterIsOpen: boolean;

    @Column(DataType.STRING)
    orderTakeId: string;

    @Column(DataType.REAL)
    orderTakePrice: number;

    @Column(DataType.REAL)
    orderTakeAmount: number;

    @Column(DataType.BOOLEAN)
    orderTakeIsOpen: boolean;

    @Column(DataType.STRING)
    orderStopId: string;

    @Column(DataType.REAL)
    orderStopPrice: number;

    @Column(DataType.REAL)
    orderStopAmount: number;

    @Column(DataType.BOOLEAN)
    orderStopIsOpen: boolean;

    @Column(DataType.STRING)
    orderSafeId: string;

    @Column(DataType.REAL)
    orderSafePrice: number;

    @Column(DataType.REAL)
    orderSafeAmount: number;

    @Column(DataType.BOOLEAN)
    orderSafeIsOpen: boolean;
}
