import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/User.schema';
import { BcryptService } from 'src/shared/bcrypt/bcrypt.service';
import { CreateUserDto } from './dto/CreateUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private bcryptService: BcryptService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const hashedPassword = await this.bcryptService.hashPassword(
      createUserDto.password,
    );
    const newUser = new this.userModel({
      passwordHash: hashedPassword,
      ...createUserDto,
    });
    return newUser.save();
  }

  async getUserById(id: string) {
    return this.userModel.findById(id);
  }

  async getUserByUsername(username: string) {
    return this.userModel.findOne({ username: username });
  }
}
