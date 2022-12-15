

import { ApiProperty } from "@nestjs/swagger";
import { ResponseFormat } from "src/common/dto/responses";
import { UserResponseDTO } from "./user-response.dto";

class RegisterUserResponseDataDTO {
    @ApiProperty({type: String})
    id: string;
    @ApiProperty({type:String})
    updatedAt: string;
    @ApiProperty({type:String})
    deletedAt: string;
    @ApiProperty({type:String})
    createdAt: string;
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
}

export class RegisterUserResponseDTO extends ResponseFormat<RegisterUserResponseDataDTO> {

    @ApiProperty({type: RegisterUserResponseDataDTO})
    data: RegisterUserResponseDataDTO;

}
