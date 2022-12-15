import { ApiProperty } from "@nestjs/swagger";
import { ResponseFormat } from "src/common/dto/responses";
import { HouseResponseSecondaryDTO } from "./house-response-secondary.dto";

class DeleteHouseResponseDataDTO {
    @ApiProperty({type: Boolean})
    wasDeleted:boolean;
}

export class DeleteHouseResponseDTO extends ResponseFormat<DeleteHouseResponseDataDTO> {
    @ApiProperty({type: DeleteHouseResponseDataDTO })
    data: DeleteHouseResponseDataDTO;
}