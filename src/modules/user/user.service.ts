import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateUserDto, GetUserDto } from './dto/user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './user.entity'
import { In, Repository } from 'typeorm'
import { Roles } from '../roles/entities/roles.entity'
import * as argon2d from 'argon2'
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Roles) private rolesRepository: Repository<Roles>,
  ) {}
  async create(user: CreateUserDto) {
    if (!user.roles) {
      const role = await this.rolesRepository.findOne({
        where: {
          id: 3,
        },
      })
      user.roles = [role]
    }
    if (user.roles instanceof Array && user.roles.every((el) => typeof el === 'number')) {
      user.roles = await this.rolesRepository.find({
        where: {
          id: In(user.roles),
        },
      })
    }
    const userTmp = await this.usersRepository.create(user as User)
    // 对用户密码使用argon2d加密
    userTmp.password = await argon2d.hash(userTmp.password)
    return this.usersRepository.save(userTmp)
  }

  findAll(query: GetUserDto) {
    const { page = 1, limit = 10, username, gender, role } = query
    return this.usersRepository.find({
      relations: {
        roles: true,
      },
      where: {
        username: username,
        gender: gender,
        roles: {
          id: role,
        },
      },
      take: limit,
      skip: (page - 1) * limit,
    })
  }

  findOne(id: number) {
    return this.usersRepository.findOne({ where: { id } })
  }

  find(username: string) {
    return this.usersRepository.findOne({ where: { username } })
  }
  async update(id: number, user: Partial<User>) {
    const userTmp = await this.usersRepository.findOne({ where: { id } })
    const newUser = this.usersRepository.merge(userTmp, user)
    // 下面的update方法，只适合单模型的更新，不适合有关系型的模型更新
    return this.usersRepository.update(id, newUser)
  }
  async remove(id: number) {
    const user = await this.findOne(id)
    if (!user) {
      throw new HttpException('id存在', HttpStatus.BAD_REQUEST)
    }
    return await this.usersRepository.remove(user)
  }
}
