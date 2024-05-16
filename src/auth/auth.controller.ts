import {
  Request,
  Controller,
  Post,
  UseGuards,
  Get,
  UseInterceptors,
  UploadedFile,
  Body,
  HttpException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { RegisterDto } from './dto/Register.dto';
import { UsersService } from 'src/users/users.service';
import { mongo } from 'mongoose';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Public()
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  @Public()
  @Post('register')
  @UseInterceptors(FileInterceptor('avatar'))
  async register(
    @Body() registerDto: RegisterDto,
    @UploadedFile() avatar: Express.Multer.File,
  ) {
    try {
      const newUser = await this.usersService.createUser({
        avatarUrl: avatar?.filename,
        ...registerDto,
      });
      return newUser;
    } catch (err) {
      if (err instanceof mongo.MongoServerError) {
        if (err.code === 11000) {
          throw new HttpException(
            `Duplicated: ${Object.keys(err.errorResponse.keyValue)}`,
            409,
          );
        }
      } else throw new HttpException('Unknown error', 500);
    }
  }

  @Get('test-jwt')
  testJwt(@Request() req) {
    return req.user;
  }
}
