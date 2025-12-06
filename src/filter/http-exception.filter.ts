import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Inject, LoggerService } from '@nestjs/common'
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(@Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService) {}
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    this.logger.error(exception.message, exception.stack)
    const status = exception.getStatus()
    this.logger.error(exception.message, exception.stack)
    response.status(status).json({
      ret: status,
      timestamp: new Date().toISOString(),
      message: exception.message || exception.name,
    })
  }
}
