import { IUpdateUser } from "../../interfaces/input/update-user.interface";


export class UpdateUserDTO implements IUpdateUser {
    readonly email: string;
    readonly phoneNumber: string;
    readonly password: string;
}