import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDTO  {
    @ApiProperty({type: String})
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;
    @ApiProperty({type: String})
    @IsString()
    @IsNotEmpty()
    readonly password: string;
}