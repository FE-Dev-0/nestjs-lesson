import { Injectable } from '@nestjs/common'
import { CreateRoleDto } from './dto/create-role.dto'
import { UpdateRoleDto } from './dto/update-role.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Roles } from './entities/roles.entity'
import { Repository } from 'typeorm'

@Injectable()
export class RolesService {
  constructor(@InjectRepository(Roles) private RolesRepository: Repository<Roles>) {}
  create(createRoleDto: CreateRoleDto) {
    return this.RolesRepository.save(createRoleDto)
  }

  findAll() {
    return this.RolesRepository.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} role`
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const role = await this.RolesRepository.findOne({
      where: {
        id,
      },
    })
    if (!role) throw Error('id不存在')
    role.name = updateRoleDto.name
    return this.RolesRepository.save(role)
  }

  remove(id: number) {
    return `This action removes a #${id} role`
  }
}
