import { IsEnum, IsNumber, IsOptional, IsString, MaxLength, Min, MinLength } from 'class-validator';
import { ESide, EStock, EType } from './task/task.enum';
import { TaskModel } from './task/task.model';

export class AddTaskDto {
    @IsEnum(EStock)
    stock: EStock;

    @IsNumber()
    @Min(0)
    amount: number;

    @IsEnum(EType)
    type: EType;

    @IsEnum(ESide)
    side: ESide;

    @IsNumber()
    @Min(0)
    fib0: number;

    @IsNumber()
    @Min(0)
    fib1: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    cancelPrice: number;

    @IsOptional()
    cancelTime: Date;
}

export class AuthDto {
    @IsString()
    @MinLength(8)
    @MaxLength(64)
    token: string;
}
