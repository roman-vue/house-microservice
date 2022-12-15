
import { ApiProperty } from "@nestjs/swagger";
import { ResponseFormat } from "src/common/dto/responses";
import { UserResponseDTO } from "./user-response.dto";

export class GetUserByIdResponseDTO extends ResponseFormat<UserResponseDTO> {

    @ApiProperty({type: UserResponseDTO})
    data: UserResponseDTO;

}