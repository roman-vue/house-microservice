import { ApiProperty } from "@nestjs/swagger";
import { ResponseFormat } from "src/common/dto/responses";
import { DiscountResponseDTO } from "./discount-response.dto";

export class GetAllDiscountsResponseDTO extends ResponseFormat<DiscountResponseDTO[]> {
    @ApiProperty({type: [DiscountResponseDTO] })
    data: DiscountResponseDTO[];
}