import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'
import 'winston-daily-rotate-file'
import { TransformInterceptor } from './interceptor/transform.interceptor'
async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('/api')
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER))
  app.useGlobalInterceptors(new TransformInterceptor())
  await app.listen(3000)
}

bootstrap()
