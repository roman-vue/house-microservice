

import { ApiProperty } from "@nestjs/swagger";
import { ResponseFormat } from "src/common/dto/responses";
import { UserResponseDTO } from "./user-response.dto";

class DeleteUserResponseDataDTO {

    @ApiProperty({type:Boolean})
    wasDeleted: boolean;

}

export class DeleteUserResponseDTO extends ResponseFormat<DeleteUserResponseDataDTO> {

    @ApiProperty({type: DeleteUserResponseDataDTO})
    data: DeleteUserResponseDataDTO;

}
