import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateUserDto, GetUserDto } from './dto/user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './user.entity'
import { Repository } from 'typeorm'
@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}
  create(createUserDto: CreateUserDto) {
    return this.usersRepository.save(createUserDto)
  }

  findAll(query: GetUserDto) {
    const { page, limit, username, gender, role } = query
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

  update(id: number) {
    return `This action updates a #${id} user`
  }
  async remove(id: number) {
    const user = await this.findOne(id)
    if (!user) {
      throw new HttpException('id存在', HttpStatus.BAD_REQUEST)
    }
    return await this.usersRepository.remove(user)
  }
}
