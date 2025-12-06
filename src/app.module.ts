import { Global, Logger, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RolesModule } from './modules/roles/roles.module'
import { AuthModule } from './auth/auth.module'
import { LogsModule } from './modules/logs/logs.module'
import { APP_FILTER } from '@nestjs/core'
import { UserModule } from './modules/user/user.module'
import { HttpExceptionFilter } from './filter/http-exception.filter'
import * as dotenv from 'dotenv'
import * as Joi from 'joi' // 可选：使用 Joi 进行验证
const envFilePath = `.env.${process.env.NODE_ENV || 'development'}`
import { connectionParams } from '../ormconfig'

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath,
      load: [() => dotenv.config({ path: '.env' })],
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('development', 'production').default('development'),
        DB_HOST: Joi.alternatives().try(Joi.string().ip(), Joi.string().hostname()),
        DB_PORT: Joi.number().default(3306),
        DB_TYPE: Joi.string().valid('mysql', 'postgres'),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
        DB_SYN: Joi.boolean().default(false),
        LOG_LEVEL: Joi.string().valid('debug', 'info', 'warn', 'error').default('info'),
        LOG_ON: Joi.boolean().default(true),
      }),
    }),
    TypeOrmModule.forRoot(connectionParams),
    UserModule,
    RolesModule,
    AuthModule,
    LogsModule,
  ],
  controllers: [],
  providers: [
    Logger,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
  exports: [Logger],
})
export class AppModule {}
