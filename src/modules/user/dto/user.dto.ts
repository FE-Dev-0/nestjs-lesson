import { IsInt, IsNotEmpty, IsString, Length } from 'class-validator'
import { Roles } from 'src/modules/roles/entities/roles.entity'

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 32)
  username: string

  @IsString()
  @IsNotEmpty()
  @Length(6, 32)
  password: string

  @IsInt()
  gender?: number

  roles?: number[] | Roles[]
}

export interface GetUserDto {
  page?: number
  limit?: number
  username?: string
  role?: number
  gender?: number
}
