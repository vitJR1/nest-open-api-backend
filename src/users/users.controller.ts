import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEntity } from './entities/user.entity';
import { PaginatedList } from '../utils/paginated.list';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/mutate')
  async mutateUser(@Body() user: UserEntity): Promise<UserEntity> {
    return await this.usersService.save(user);
  }

  @Post('')
  async userList(): Promise<PaginatedList<UserEntity>> {
    return await this.usersService.findPaginatedMany();
  }

  @Get('/:id')
  async createUSer(@Param('id') id: number): Promise<UserEntity> {
    return await this.usersService.findOneById(id);
  }
}
