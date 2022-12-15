import { ILogin } from "../../interfaces/input/login.interface";

export class LoginDTO implements ILogin {
    readonly email: string;
    readonly password: string;
}