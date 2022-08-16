import { IsEnum, IsNumber, IsOptional, Min } from 'class-validator';
import { EStock } from './app.enum';
import { Task } from './app.model';

export class AddTaskDto {
    @IsEnum(EStock)
    stock: EStock;

    @IsNumber()
    @Min(0)
    fundAmount: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    longFib0: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    longFib1: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    longCancelPrice: number;

    @IsOptional()
    longCancelTime: Date;

    @IsOptional()
    @IsNumber()
    @Min(0)
    shortFib0: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    shortFib1: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    shortCancelPrice: number;

    @IsOptional()
    shortCancelTime: Date;
}

export type TExplainTask = {
    id: Task['id'];
    stock: Task['stock'];
    fundAmount: Task['fundAmount'];
    long: Task['long'];
    short: Task['short'];
};

export type TExplain = Array<TExplainTask>;
