import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsPhoneNumber, IsString } from "class-validator";

export class CreateUserDTO {
    @ApiProperty({type: String})
    @IsNotEmpty()
    @IsString()
    readonly name: string;
    @ApiProperty({type: String})
    @IsNotEmpty()
    @IsString()
    readonly lastname: string;
    @ApiProperty({type: String})
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;
    @ApiProperty({type: Number})
    @IsNotEmpty()
    @IsNumber()
    readonly age: number;
    @ApiProperty({type: String})
    @IsNotEmpty()
    @IsPhoneNumber()
    readonly phoneNumber: string;
    @ApiProperty({type: String})
    @IsNotEmpty()
    @IsString()
    readonly password: string;
}