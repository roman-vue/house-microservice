import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { ResponseFormat } from 'src/common/dto/responses';
import { ProxyService } from 'src/configuration/proxy';
import { MessageQueues, RoutesBasePaths } from 'src/utils/enums';
import { AuthenticationMessages } from 'src/utils/enums/messages/auth';
import { LoginDTO } from './dto/input';
import { LoginResponseDTO } from './dto/output/login-response.dto';
import { ILoginResponse } from './interfaces/output';

@Controller(RoutesBasePaths.authentication)
@ApiTags('Auth Microservice - Authentication')
export class AuthenticationController {

    constructor(private readonly clientProxy: ProxyService){}

    private _clientProxyAuth = this.clientProxy.createClientProxy(MessageQueues.auth);

    public async onApplicationBootstrap() { 
        await this._clientProxyAuth.connect();
    }

    @Post('/')
    @ApiOperation({
        summary: "Authenticate user and receive login token"
    })
    @ApiResponse({ type: LoginResponseDTO, status: 201})
    public login(@Body() LoginDTO: LoginDTO): Observable<ILoginResponse>{
        return this._clientProxyAuth.send(AuthenticationMessages.LOGIN,LoginDTO);
    }

}
