import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Inject,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { ErrorLoggerService } from '../errorLogger';
import { ErrorLoggerInterface } from '../errorLogger/errorLogger.interface';
export interface ErrorException {
  errorStatus: number;
  errorCode: string;
  errorValue: string;
  errorQuery: any;
}
export interface Exception {
  status: boolean;
  error: ErrorException;
}
@Catch()
export class ErrorCatcher implements ExceptionFilter {
  constructor(
    @Inject(ErrorLoggerService) private errorLoggerService: ErrorLoggerService,
  ) {}
  catch(exception: HttpException | Exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response: Response = ctx.getResponse<Response>();
    const request: Request = ctx.getRequest<Request>();
    let statusCode: number;
    let error: ErrorException | string | object;
    console.log(exception);
    if (!(exception instanceof HttpException)) {
      if (exception.error) {
        statusCode = exception?.error?.errorStatus;
        error = exception.error;
      } else {
        statusCode = 500;
        if (exception['message']) {
          error = exception['message'];
        } else {
          error = exception;
        }
      }
    } else {
      statusCode = exception.getStatus();
      error = exception.getResponse();
    }
    const ipAddress = request.headers['x-real-ip']
      ? request.headers['x-real-ip'].toString()
      : request.connection.remoteAddress;
    const obj: ErrorLoggerInterface = {
      timestamp: new Date(),
      path: request.originalUrl,
      data: JSON.stringify({
        body: request.body,
        query: request.query,
        headers: {
          auth: request.headers.authorization,
        },
        param: request.originalUrl,
      }),
      error: JSON.stringify(error),
      method: request.method,
      ip: ipAddress,
    };
    this.errorLoggerService.createErrorLog({ ...obj }).finally();
    delete obj.data;
    obj.error = JSON.parse(obj.error);
    response.status(statusCode).json(obj);
  }
}
