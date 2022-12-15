import { ApiProperty } from "@nestjs/swagger";
import { ResponseFormat } from "src/common/dto/responses";

class DeleteDiscountResponseDataDTO {
    @ApiProperty({type: Boolean})
    wasDeleted: boolean;
}

export class DeleteDiscountResponseDTO extends ResponseFormat<DeleteDiscountResponseDataDTO> {
    @ApiProperty({type: DeleteDiscountResponseDataDTO })
    data: DeleteDiscountResponseDataDTO;
}