import { ApiProperty } from "@nestjs/swagger";
import { ResponseFormat } from "src/common/dto/responses";

class ValidateDiscountResponseDataDTO {
    @ApiProperty({type: Boolean})
    isValidDiscount: boolean;
}

export class ValidateDiscountResponseDTO extends ResponseFormat<ValidateDiscountResponseDataDTO> {
    @ApiProperty({type: ValidateDiscountResponseDataDTO })
    data: ValidateDiscountResponseDataDTO;
}