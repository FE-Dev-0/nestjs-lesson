import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { JwtService } from '@nestjs/jwt'
import * as argon2 from 'argon2'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, password: string): Promise<any> {
    const [user] = await this.usersService.findAll({ username, page: 1, limit: 1 })
    if (!user) {
      throw new ForbiddenException('用户不存在，请注册')
    }
    const isPasswordValid = await argon2.verify(user.password, password)
    if (!isPasswordValid) {
      throw new ForbiddenException('用户名或者密码错误')
    }
    const payload = { username: user.username, sub: user.id }
    return {
      access_token: this.jwtService.sign(payload),
    }
  }

  async signup(username: string, password: string): Promise<any> {
    const user = await this.usersService.find(username)
    if (user) {
      throw new ForbiddenException('用户已存在')
    }
    const res = this.usersService.create({ username, password, gender: 0 })
    return res
  }
}
