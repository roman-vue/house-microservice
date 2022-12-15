
import { ApiProperty } from "@nestjs/swagger";
import { ResponseFormat } from "src/common/dto/responses";
import { UserResponseDTO } from "./user-response.dto";

class UpdateUserResponseDataDTO {
    @ApiProperty({type: String})
    email: string;
    @ApiProperty({type: String})
    phoneNumber: string;
    @ApiProperty({type: String})
    password: string;
    @ApiProperty({type: String})
    id: string;
    @ApiProperty({type: String})
    deletedAt: string;
    @ApiProperty({type: String})
    updatedAt: string;
}

export class UpdateUserResponseDTO extends ResponseFormat<UpdateUserResponseDataDTO> {

    @ApiProperty({type: UpdateUserResponseDataDTO})
    data: UpdateUserResponseDataDTO;

}