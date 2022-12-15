import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateHouseDTO  {
    @ApiProperty({type:String})
    @IsNotEmpty()
    @IsString()
    readonly name: string;
    @ApiProperty({type:String})
    @IsNotEmpty()
    @IsString()
    readonly address: string;
    @ApiProperty({type:String})
    @IsNotEmpty()
    @IsUUID()
    readonly userOwnerId: string;
}