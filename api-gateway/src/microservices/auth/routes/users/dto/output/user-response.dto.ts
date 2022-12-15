import { ApiProperty } from "@nestjs/swagger";

export class UserResponseDTO {
    @ApiProperty({type: String})
    id: string;
    @ApiProperty({type: String})
    name: string;
    @ApiProperty({type: String})
    lastname: string;
    @ApiProperty({type: String})
    email:string;
    @ApiProperty({type: Number})
    age:number;
    @ApiProperty({type: String})
    phoneNumber:string;
    @ApiProperty({type: String})
    password:string;
}