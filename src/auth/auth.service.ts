import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@chat/resources/user/user.service';
import { UserInterface } from '@chat/resources/user/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    pass: string,
  ): Promise<Partial<UserInterface>> {
    const user = await this.usersService.findOne({ username });
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: UserInterface) {
    const payload = { username: user.username, sub: user['id'] };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
