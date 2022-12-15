import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsPhoneNumber, IsString } from "class-validator";

export class UpdateUserDTO {
    @ApiProperty({type: String})
    @IsOptional()
    @IsEmail()
    readonly email: string;
    @ApiProperty({type: String})
    @IsOptional()
    @IsPhoneNumber()
    readonly phoneNumber: string;
    @ApiProperty({type: String})
    @IsOptional()
    @IsString()
    readonly password: string;
}