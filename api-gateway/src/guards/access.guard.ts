import {
  UnauthorizedException,
  ForbiddenException,
  ExecutionContext,
  CanActivate,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';


@Injectable()
export class AccessGuard implements CanActivate {
  constructor( private readonly config: ConfigService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) throw new UnauthorizedException('Null Access Token'); 

    try {
      const user = jwt.verify(token,`${this.config.get<string>('TOKEN_SEED')}`);
      req.session = user; //User Session
    } catch (error) {
      throw new ForbiddenException('Invalid Access Token');
    }
    return true;
  }
}
