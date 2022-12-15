import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersMessages } from 'src/utils/enums/users-messages.enum';
import { CreateUserDTO } from './dto/input';
import { UsersService } from './users.service';
import { IDeleteUserResponse } from './interfaces/output';
import { IUser } from 'src/database/interfaces/users';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern(UsersMessages.GET_USERS)
  public getUsers(): Promise<IUser[]> {
    return this.usersService.getUsers();
  }

  @MessagePattern(UsersMessages.GET_USER_BY_ID)
  public getUserById(@Payload() userId: string): Promise<IUser> {
    return this.usersService.getUserById(userId);
  }

  @MessagePattern(UsersMessages.REGISTER_USER)
  public registerUser(@Payload() createUserDTO: CreateUserDTO): Promise<IUser> {
    return this.usersService.registerUser(createUserDTO);
  }

  @MessagePattern(UsersMessages.UPDATE_USER)
  public updateUser(@Payload() { userId, updateUserDTO }: any): Promise<IUser> {
    return this.usersService.updateUser(userId, updateUserDTO);
  }

  @MessagePattern(UsersMessages.DELETE_USER)
  public deleteUser(@Payload() userId: string): Promise<IDeleteUserResponse> {
    return this.usersService.deleteUser(userId);
  }
}
