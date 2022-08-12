import { IsEnum, IsNumber, IsOptional, Min } from 'class-validator';
import { ELevel, EStock } from './app.model';

export class AddTaskDto {
    @IsEnum(EStock)
    stock: EStock;

    @IsOptional()
    @IsNumber()
    @Min(0)
    longFib0: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    longFib1: number;

    @IsOptional()
    @IsEnum(ELevel)
    longEnterLevel: ELevel;

    @IsOptional()
    @IsNumber()
    @Min(0)
    longCancelPrice: number;

    @IsOptional()
    longCancelTime: Date;

    @IsOptional()
    @IsNumber()
    @Min(0)
    longFundAmount: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    shortFib0: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    shortFib1: number;

    @IsOptional()
    @IsEnum(ELevel)
    shortEnterLevel: ELevel;

    @IsOptional()
    @IsNumber()
    @Min(0)
    shortCancelPrice: number;

    @IsOptional()
    shortCancelTime: Date;

    @IsOptional()
    @IsNumber()
    @Min(0)
    shortFundAmount: number;
}
