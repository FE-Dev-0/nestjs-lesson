import { Test } from '@nestjs/testing'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { DataSource, DataSourceOptions } from 'typeorm'
import * as dotenv from 'dotenv'
import * as fs from 'fs'
import { ConfigEnum } from 'src/enum/const'
function getEnv(env: string): Record<string, unknown> {
  if (fs.existsSync(env)) {
    return dotenv.parse(fs.readFileSync(env))
  }
  return {}
}

const entityDir =
  process.env.NODE_ENV === 'test' ? [__dirname + '/**/*.entity.ts'] : [__dirname + '/**/*.entity.{js,ts}']

function buildConnectionParams() {
  const defaultConfig = getEnv('.env')
  const envConfig = getEnv(`.env.${process.env.NODE_ENV || 'development'}`)
  const config = {
    ...envConfig,
    ...defaultConfig,
  }

  return {
    type: config[ConfigEnum.DB_TYPE],
    host: config[ConfigEnum.DB_HOST],
    port: config[ConfigEnum.DB_PORT],
    username: config[ConfigEnum.DB_USERNAME],
    password: config[ConfigEnum.DB_PASSWORD],
    database: config[ConfigEnum.DB_DATABASE],
    entities: entityDir,
    synchronize: config[ConfigEnum.DB_SYN] === 'true',
    logging: false,
  } as TypeOrmModuleOptions
}

export const connectionParams = buildConnectionParams()

export default new DataSource({
  ...connectionParams,
  migrations: ['src/migrations/*.ts'],
  subscribers: [],
} as DataSourceOptions)
