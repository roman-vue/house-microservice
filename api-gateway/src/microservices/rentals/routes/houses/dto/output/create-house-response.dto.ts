import { ApiProperty } from "@nestjs/swagger";
import { ResponseFormat } from "src/common/dto/responses";
import { HouseResponseSecondaryDTO } from "./house-response-secondary.dto";


export class CreateHouseResponseDTO extends ResponseFormat<HouseResponseSecondaryDTO> {
    @ApiProperty({type: HouseResponseSecondaryDTO })
    data: HouseResponseSecondaryDTO;
}