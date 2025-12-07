import { Controller, Get, Post, Body, Patch, Param, Delete, Logger, Query, ParseIntPipe } from '@nestjs/common'
import { UserService } from './user.service'
import { User } from './user.entity'
import { CreateUserDto } from './dto/user.dto'
import { CreateUserPipe } from './pipes/create-user/create-user.pipe'

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private logger: Logger,
  ) {}

  @Post()
  addUser(@Body(CreateUserPipe) dto: CreateUserDto): any {
    const user = dto as unknown as User
    return this.userService.create(user)
  }

  @Get()
  getUsers(@Query() query: any) {
    return this.userService.findAll(query)
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id)
  }

  @Patch(':id')
  updateUser(@Param('id') id: any, @Body() dto: any) {
    const user = dto as User
    return this.userService.update(id, user)
  }

  @Delete(':id')
  removeUser(@Param('id') id: string) {
    return this.userService.remove(+id)
  }
}
