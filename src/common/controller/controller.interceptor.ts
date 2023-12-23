import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ControllerLoggerService } from './index';
import { Request, Response } from 'express';
import { ControllerLoggerInterface } from './controller-logger.interface';

@Injectable()
export class ControllerInterInterceptor implements NestInterceptor {
  constructor(
    @Inject(ControllerLoggerService)
    private controllerLogger: ControllerLoggerService,
  ) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const response: Response = ctx.getResponse<Response>();
    const request: Request = ctx.getRequest<Request>();
    const ipAddress = request.headers['x-real-ip']
      ? request.headers['x-real-ip'].toString()
      : request.connection.remoteAddress;
    const query: ControllerLoggerInterface = {
      timestamp: new Date(),
      body: request.body,
      ip: ipAddress,
      method: request.method,
      param: 'not-found',
      path: request.path,
      query: JSON.stringify(request.query),
      headers: JSON.stringify(request.headers),
    };
    this.controllerLogger.createLog(query).finally();
    return next.handle();
  }
}
