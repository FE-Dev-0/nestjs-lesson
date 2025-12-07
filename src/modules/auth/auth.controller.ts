import { UserService } from './../user/user.service'
import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { SignInDto } from './dto/auth.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/signin')
  signin(@Body() dto: SignInDto) {
    const { username, password } = dto
    return this.authService.signIn(username, password)
  }

  @Post('/signup')
  signup(@Body() dto: SignInDto) {
    const { username, password } = dto
    console.log(username, password)
    return this.authService.signup(username, password)
  }
}
