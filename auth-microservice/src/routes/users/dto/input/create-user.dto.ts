import { ICreateUser } from "../../interfaces/input/create-user.interface";


export class CreateUserDTO implements ICreateUser {
    readonly name: string;
    readonly lastname: string;
    readonly email: string;
    readonly age: number;
    readonly phoneNumber: string;
    readonly password: string;
}