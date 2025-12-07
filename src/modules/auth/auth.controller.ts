import { Body, ClassSerializerInterceptor, Controller, Post, UseInterceptors } from '@nestjs/common'
import { AuthService } from './auth.service'
import { SignInDto } from './dto/auth.dto'

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
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
    return this.authService.signup(username, password)
  }
}
