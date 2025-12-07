import { CreateUserDto } from '../../dto/user.dto'
import { Roles } from './../../../roles/entities/roles.entity'
import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common'

function isRole(val: any): val is Roles {
  if (typeof val === 'object' && val.id) {
    return true
  }
  return false
}

@Injectable()
export class CreateUserPipe implements PipeTransform {
  transform(value: CreateUserDto, metadata: ArgumentMetadata) {
    if (value.roles && value.roles instanceof Array && value.roles.length > 0) {
      if (isRole(value.roles[0])) {
        value.roles = value.roles.map((role) => role.id)
      }
    }
    return value
  }
}
