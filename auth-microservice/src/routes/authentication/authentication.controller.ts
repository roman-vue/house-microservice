import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthenticationMessages } from 'src/utils/enums';
import { AuthenticationService } from './authentication.service';
import { LoginDTO } from './dto/input';
import { ILoginResponse } from './interfaces/output';

@Controller()
export class AuthenticationController {

    constructor( private readonly authenticationService: AuthenticationService ){}

    @MessagePattern(AuthenticationMessages.LOGIN)
    public login(@Payload() loginDTO: LoginDTO) : Promise<ILoginResponse> {
        return this.authenticationService.login(loginDTO);
    }

}
