import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
  private readonly saltRounds = 10;

  async hashPassword(password: string) {
    return bcrypt.hash(password, this.saltRounds);
  }

  /**
   * Compare a raw password with the hashed
   */
  async compare(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }
}
