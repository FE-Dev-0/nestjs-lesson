import { Logs } from 'src/modules/logs/logs.entity'
import { User } from 'src/modules/user/user.entity'
import { Roles } from 'src/modules/roles/entities/roles.entity'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export default {
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: '12345678',
  database: 'nestdb',
  entities: [User, Logs, Roles],
  synchronize: true,
} as TypeOrmModuleOptions
