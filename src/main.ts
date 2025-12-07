import { NestFactory, HttpAdapterHost } from '@nestjs/core'
import { AppModule } from './app.module'
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'
import 'winston-daily-rotate-file'
import { TransformInterceptor } from './interceptor/transform.interceptor'
import { AllExceptionFilter } from './filter/all-exception.filter'
import { Logger, ValidationPipe } from '@nestjs/common'
async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('/api')
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER))
  const httpAdapter = app.get(HttpAdapterHost)
  const logger = new Logger()
  app.useGlobalFilters(new AllExceptionFilter(httpAdapter, logger))
  app.useGlobalInterceptors(new TransformInterceptor())
  app.useGlobalPipes(new ValidationPipe({}))
  await app.listen(3000)
}

bootstrap()
