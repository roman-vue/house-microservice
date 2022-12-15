import { ConflictException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';
import { ILogin } from './interfaces/input';
import { ILoginResponse } from './interfaces/output';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { IUser } from 'src/database/interfaces/users';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {}

  public async login(loginData: ILogin): Promise<ILoginResponse> {
    const { email, password } = loginData;
    const userFound = await this.usersService.findUserByEmail(email);
    const arePasswordsEqual = this.compareLoginPasswords(
      password,
      userFound.password,
    );
    if (!arePasswordsEqual)
      throw new ConflictException('The password is incorrect');
    const token = this.createUserToken(userFound);
    return { token };
  }

  private createUserToken(user: IUser): string {
    const { password, ...userWithNoPassword } = user;
    const tokenSeed = this.configService.get<string>('TOKEN_SEED');
    const token = jwt.sign({ user: userWithNoPassword }, tokenSeed);
    return token;
  }

  private compareLoginPasswords(
    loginPassword: string,
    userFoundPassword: string,
  ) {
    let arePasswordsEqual = bcrypt.compareSync(
      loginPassword,
      userFoundPassword,
    );
    return arePasswordsEqual;
  }
}
