import { BadRequestException, Body, Controller, Get, Post, Query, Redirect, Render } from '@nestjs/common';
import { AppService, TLogs } from './app.service';
import { AddTaskDto, TExplain } from './app.dto';

type TNavData = {
    isStatusPage?: true;
    isLogsPage?: true;
    isAddTaskPage?: true;
    isShutdownPage?: true;
};

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get('/')
    @Post('/')
    @Render('pages/status')
    async getStatusPage(): Promise<TNavData & { explain: TExplain }> {
        return { isStatusPage: true, explain: await this.appService.getExplain() };
    }

    @Get('/logs')
    @Render('pages/logs')
    async getLogsPage(): Promise<TNavData & { logs: TLogs }> {
        return {
            isLogsPage: true,
            logs: await this.appService.getLogs(),
        };
    }

    @Get('/add-task')
    @Render('pages/add-task')
    async getAddTaskPage(): Promise<TNavData> {
        return { isAddTaskPage: true };
    }

    @Post('/add-task')
    @Redirect('/')
    async addTask(@Body() body: AddTaskDto): Promise<void> {
        if (!body.longFib0 && !body.shortFib0) {
            throw new BadRequestException('Invalid config');
        }

        if (body.longFib0) {
            if (!body.longFib1) {
                throw new BadRequestException('Invalid Long config');
            }

            if (body.longFib0 < body.longFib1) {
                throw new BadRequestException('Long fib 0 < Long fib 1');
            }
        }

        if (body.shortFib0) {
            if (!body.shortFib1) {
                throw new BadRequestException('Invalid Short config');
            }

            if (body.shortFib0 > body.shortFib1) {
                throw new BadRequestException('Short fib 0 > Short fib 1');
            }
        }

        await this.appService.addTask(body);
    }

    @Get('/cancel-task')
    @Render('pages/cancel-task')
    async promptCancelTask(
        @Query('id') id: string,
        @Query('long') long: string,
        @Query('short') short: string,
    ): Promise<{ id: string; long: string; short: string }> {
        return { id, long, short };
    }

    @Post('/cancel-task')
    @Redirect('/')
    async cancelTask(
        @Query('id') id: string,
        @Query('long') long: string,
        @Query('short') short: string,
    ): Promise<void> {
        const isLong = long === 'true';
        const isShort = short === 'true';

        await this.appService.cancelTask(Number(id), isLong, isShort);
    }

    @Get('/shutdown')
    @Render('pages/shutdown')
    async getAddTask(): Promise<TNavData> {
        return { isShutdownPage: true };
    }

    @Post('/shutdown')
    @Redirect('/')
    async shutdown(): Promise<void> {
        await this.appService.shutdown();
    }
}
