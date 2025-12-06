import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './user.entity'
import { Repository } from 'typeorm'
@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}
  create(createUserDto: CreateUserDto) {
    return this.usersRepository.save(createUserDto)
  }

  findAll() {
    return this.usersRepository.find({
      relations: {
        roles: true,
      },
    })
  }

  findOne(id: number) {
    return this.usersRepository.findOne({ where: { id } })
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    console.log(updateUserDto)

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
