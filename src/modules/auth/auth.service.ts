import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, password: string): Promise<any> {
    const [user] = await this.usersService.findAll({ username, page: 1, limit: 1 })
    if (user?.password !== password) {
      throw new UnauthorizedException()
    }
    const payload = { username: user.username, sub: user.id }
    return {
      access_token: this.jwtService.sign(payload),
    }
  }

  async signup(username: string, password: string): Promise<any> {
    return {
      username,
      password,
    }
  }
}
