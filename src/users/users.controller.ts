import { Controller, Get, Param, HttpException } from '@nestjs/common';
import { UsersService } from './users.service';
import mongoose from 'mongoose';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const isUserIdValid = mongoose.Types.ObjectId.isValid(id);
    if (!isUserIdValid) throw new HttpException('User not found.', 404);
    const user = await this.usersService.getUserById(id);
    if (!user) throw new HttpException('User not found.', 404);
    return user;
  }
}
