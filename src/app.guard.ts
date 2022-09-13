import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { TOKEN } from './app.const';

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const httpContext = context.switchToHttp();
        const token = httpContext.getRequest<Request>().cookies.token;

        if (!token) {
            httpContext.getResponse<Response>().redirect('/auth');
            return false;
        }

        return token === TOKEN;
    }
}
