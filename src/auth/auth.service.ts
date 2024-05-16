import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BcryptService } from 'src/shared/bcrypt/bcrypt.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private bcryptService: BcryptService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.usersService.getUserByUsername(username);
    if (
      user &&
      (await this.bcryptService.compare(password, user.passwordHash)) === true
    ) {
      const result = {
        id: user._id,
        username: user.username,
      };
      return result;
    }
    return null;
  }

  async login(user) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
