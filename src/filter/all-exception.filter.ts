import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Inject, LoggerService } from '@nestjs/common'
import { HttpAdapterHost } from '@nestjs/core'
import * as requestIp from 'request-ip'
import { QueryFailedError } from 'typeorm'

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly logger: LoggerService,
  ) {}
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    const request = ctx.getRequest()
    const { httpAdapter } = this.httpAdapterHost
    const httpStatus = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR
    let msg: string = exception['response'] || 'Internal_Server_Error'
    if (exception instanceof QueryFailedError) {
      msg = exception.message
    }
    this.logger.error(exception)
    const reasonseBody = {
      headers: request.headers,
      query: request.query,
      params: request.params,
      body: request.body,
      timestamp: new Date().toISOString(),
      ip: requestIp.getClientIp(request),
      exception: exception['name'],
      error: msg,
    }
    httpAdapter.reply(response, reasonseBody, httpStatus)
  }
}
