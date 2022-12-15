import { ApiProperty } from "@nestjs/swagger";
import { ResponseFormat } from "src/common/dto/responses";

class RegisterDiscountResponseDataDTO {
    @ApiProperty({type: String})
    code: string;
    @ApiProperty({type: String})
    houseId: string;
    @ApiProperty({type: String})
    userId: string;
    @ApiProperty({type: String})
    deletedAt: string;
    @ApiProperty({type: String})
    createdAt: string;
    @ApiProperty({type: String})
    updatedAt: string;
    @ApiProperty({type: String})
    id:string;
}

export class RegisterDiscountResponseDTO extends ResponseFormat<RegisterDiscountResponseDataDTO> {
    @ApiProperty({type: RegisterDiscountResponseDataDTO })
    data: RegisterDiscountResponseDataDTO;
}