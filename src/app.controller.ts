import {
    BadRequestException,
    Body,
    Controller,
    Get,
    Post,
    Query,
    Redirect,
    Render,
    Req,
    Res,
    UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AddTaskDto, AuthDto } from './app.dto';
import { AuthGuard } from './app.guard';
import { Request, Response } from 'express';
import * as moment from 'moment';
import { TLogs } from './logger/logger.service';
import { ESide } from './task/task.enum';
import { TaskModel } from './task/task.model';

type TNavData = {
    isAuthPage?: true;
    isStatusPage?: true;
    isLogsPage?: true;
    isAddTaskPage?: true;
    isShutdownPage?: true;
};

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get('/auth')
    @Render('pages/auth')
    async getAuthForm(): Promise<TNavData> {
        return { isAuthPage: true };
    }

    @Post('/auth')
    @Redirect('/')
    async auth(@Req() req: Request, @Res() res: Response, @Body() body: AuthDto): Promise<void> {
        await this.appService.auth(res, body.token);
    }

    @UseGuards(AuthGuard)
    @Get('/')
    @Post('/')
    @Render('pages/status')
    async getStatusPage(): Promise<TNavData & { explain: Array<TaskModel> }> {
        return { isStatusPage: true, explain: await this.appService.getExplain() };
    }

    @UseGuards(AuthGuard)
    @Get('/logs')
    @Render('pages/logs')
    async getLogsPage(): Promise<TNavData & { logs: TLogs }> {
        return {
            isLogsPage: true,
            logs: await this.appService.getLogs(),
        };
    }

    @UseGuards(AuthGuard)
    @Get('/add-task')
    @Render('pages/add-task')
    async getAddTaskPage(): Promise<TNavData> {
        return { isAddTaskPage: true };
    }

    @UseGuards(AuthGuard)
    @Post('/add-task')
    @Redirect('/')
    async addTask(@Body() body: AddTaskDto): Promise<void> {
        if (body.side === ESide.LONG) {
            if (body.fib0 < body.fib1) {
                throw new BadRequestException('Long fib 0 < Long fib 1');
            }
        }

        if (body.side === ESide.SHORT) {
            if (body.fib0 > body.fib1) {
                throw new BadRequestException('Short fib 0 > Short fib 1');
            }
        }

        if (!moment(body.cancelTime).isValid()) {
            body.cancelTime = null;
        }

        await this.appService.addTask(body);
    }

    @UseGuards(AuthGuard)
    @Get('/cancel-task')
    @Render('pages/cancel-task')
    async promptCancelTask(
        @Query('id') id: string,
        @Query('long') long: string,
        @Query('short') short: string,
    ): Promise<{ id: string; long: string; short: string }> {
        return { id, long, short };
    }

    @UseGuards(AuthGuard)
    @Post('/cancel-task')
    @Redirect('/')
    async cancelTask(@Query('id') id: string): Promise<void> {
        await this.appService.cancelTask(Number(id));
    }

    @UseGuards(AuthGuard)
    @Get('/shutdown')
    @Render('pages/shutdown')
    async getAddTask(): Promise<TNavData> {
        return { isShutdownPage: true };
    }

    @UseGuards(AuthGuard)
    @Post('/shutdown')
    @Redirect('/')
    async shutdown(): Promise<void> {
        await this.appService.shutdown();
    }
}
