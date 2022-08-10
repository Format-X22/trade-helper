import { Controller, Get, Post, Redirect, Render } from '@nestjs/common';
import { AppService } from './app.service';

type TRenderData = {
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
    async getStatusPage(): Promise<TRenderData> {
        return { isStatusPage: true };
    }

    @Get('/logs')
    @Render('logs')
    async getLogsPage(): Promise<TRenderData> {
        return { isLogsPage: true };
    }

    @Get('/add-task')
    @Render('add-task')
    async getAddTaskPage(): Promise<TRenderData> {
        return { isAddTaskPage: true };
    }

    @Post('/add-task')
    @Redirect('/')
    async addTask(): Promise<void> {
        return;
    }

    @Get('/shutdown')
    @Render('shutdown')
    async getAddTask(): Promise<TRenderData> {
        return { isShutdownPage: true };
    }

    @Post('/shutdown')
    @Redirect('/')
    async shutdown(): Promise<void> {
        await this.appService.shutdown();
    }
}
