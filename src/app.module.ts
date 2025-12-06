import { Global, Logger, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigEnum } from './enum/const'
import { User } from './modules/user/user.entity'
import { Logs } from './modules/logs/logs.entity'
import { Roles } from './modules/roles/entities/roles.entity'
import { RolesModule } from './modules/roles/roles.module'
import { AuthModule } from './auth/auth.module'
import { LogsModule } from './modules/logs/logs.module'
import { APP_FILTER } from '@nestjs/core'
import { HttpExceptionFilter } from './filter/http-exception.filter'
import * as dotenv from 'dotenv'
import * as Joi from 'joi' // 可选：使用 Joi 进行验证
const envFilePath = `.env.${process.env.NODE_ENV || 'development'}`
@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath,
      load: [() => dotenv.config({ path: '.env' })],
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('development', 'production').default('development'),
        DB_HOST: Joi.string().ip(),
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
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get(ConfigEnum.DB_HOST),
        port: configService.get(ConfigEnum.DB_PORT),
        username: configService.get(ConfigEnum.DB_USERNAME),
        password: configService.get(ConfigEnum.DB_PASSWORD),
        database: configService.get(ConfigEnum.DB_DATABASE),
        entities: [User, Logs, Roles],
        synchronize: configService.get(ConfigEnum.DB_SYN),
      }),
    }),
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
