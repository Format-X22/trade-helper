import { Controller, Get, Post, Redirect, Render } from '@nestjs/common';
import { AppService, TLogs } from './app.service';

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
    @Render('status')
    async getStatusPage(): Promise<TNavData> {
        return { isStatusPage: true };
    }

    @Get('/logs')
    @Render('logs')
    async getLogsPage(): Promise<TNavData & { logs: TLogs }> {
        return {
            isLogsPage: true,
            logs: await this.appService.getLogs(),
        };
    }

    @Get('/add-task')
    @Render('add-task')
    async getAddTaskPage(): Promise<TNavData> {
        return { isAddTaskPage: true };
    }

    @Post('/add-task')
    @Redirect('/')
    async addTask(): Promise<void> {
        return;
    }

    @Get('/shutdown')
    @Render('shutdown')
    async getAddTask(): Promise<TNavData> {
        return { isShutdownPage: true };
    }

    @Post('/shutdown')
    @Redirect('/')
    async shutdown(): Promise<void> {
        await this.appService.shutdown();
    }
}
