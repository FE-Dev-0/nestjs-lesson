import { Global, Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './user.entity'
import { Roles } from '../roles/entities/roles.entity'
@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User, Roles])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
