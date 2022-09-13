import { IsEnum, IsNumber, IsOptional, IsString, MaxLength, Min, MinLength } from 'class-validator';
import { EStock, EType } from './app.enum';
import { Task } from './app.model';

export class AddTaskDto {
    @IsEnum(EStock)
    stock: EStock;

    @IsNumber()
    @Min(0)
    fundAmount: number;

    @IsOptional()
    @IsEnum(EType)
    longType: EType;

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
    @IsEnum(EType)
    shortType: EType;

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
    long?: Task['long'];
    short?: Task['short'];
};

export type TExplain = Array<TExplainTask>;

export class AuthDto {
    @IsString()
    @MinLength(8)
    @MaxLength(64)
    token: string;
}
