import { Controller, Get, Post, Body, Patch, Param, Delete, Logger, Query } from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/user.dto'

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private logger: Logger,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto)
  }

  @Get()
  getUsers(@Query() query: any) {
    return this.userService.findAll(query)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    this.logger.warn(`id => ${id}`)
    return this.userService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.userService.update(+id)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id)
  }
}
