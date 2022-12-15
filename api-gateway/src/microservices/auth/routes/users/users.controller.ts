import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ProxyService } from 'src/configuration/proxy/proxy.service';
import { MessageQueues } from 'src/utils/enums/message-queues.enum';
import { RoutesBasePaths } from 'src/utils/enums/routes-base-paths.enum';
import { UsersMessages } from 'src/utils/enums/messages/auth/users-messages.enum';
import { CreateUserDTO } from './dto/input/create-user.dto';
import { IUser } from './interfaces/output/users.interface';
import { UpdateUserDTO } from './dto/input';
import { IDeleteUserResponse } from './interfaces/output';
import { AccessGuard } from 'src/guards';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DeleteUserResponseDTO, GetUserByIdResponseDTO, GetUsersResponseDTO, RegisterUserResponseDTO, UpdateUserResponseDTO } from './dto/output';

@Controller(RoutesBasePaths.users)
@ApiTags('Auth Microservice - Users')
export class UsersController {

    constructor(private readonly clientProxy: ProxyService){}

    private _clientProxyAuth = this.clientProxy.createClientProxy(MessageQueues.auth);

    public async onApplicationBootstrap() { 
        await this._clientProxyAuth.connect();
    }

    @Get('/')
    @ApiBearerAuth()
    @UseGuards(AccessGuard)
    @ApiOperation({summary: "Get all users"})
    @ApiResponse({type: GetUsersResponseDTO, status: 200})
    public getUsers() : Observable<IUser[]> {
        return this._clientProxyAuth.send(UsersMessages.GET_USERS,'');
    }

    @Get('/:id')
    @ApiBearerAuth()
    @UseGuards(AccessGuard)
    @ApiOperation({summary: "Get user by id"})
    @ApiResponse({type: GetUserByIdResponseDTO, status: 200})
    public getUserById(@Param('id', ParseUUIDPipe) userId: string) : Observable<IUser> {
        return this._clientProxyAuth.send(UsersMessages.GET_USER_BY_ID,userId);
    }

    @Post('/')
    @ApiOperation({summary: "Register a new user"})
    @ApiResponse({type: RegisterUserResponseDTO, status: 201})
    public registerUser(@Body() createUserDTO: CreateUserDTO ) : Observable<IUser> {
        return this._clientProxyAuth.send(UsersMessages.REGISTER_USER,createUserDTO);
    }

    @Put('/:id')
    @ApiBearerAuth()
    @UseGuards(AccessGuard)
    @ApiOperation({summary: "Update fields for a user"})
    @ApiResponse({type: UpdateUserResponseDTO, status: 200})
    public updateUser(@Param('id',ParseUUIDPipe) userId: string, @Body() updateUserDTO: UpdateUserDTO ) : Observable<IUser> {
        return this._clientProxyAuth.send(UsersMessages.UPDATE_USER,{userId, updateUserDTO});
    }

    @Delete('/:id')
    @ApiBearerAuth()
    @UseGuards(AccessGuard)
    @ApiOperation({summary: "delete a user"})
    @ApiResponse({type: DeleteUserResponseDTO, status:200 })
    public deleteUser(@Param('id', ParseUUIDPipe) userId: string) : Observable<IDeleteUserResponse> {
        return this._clientProxyAuth.send(UsersMessages.DELETE_USER,userId);
    }



}
