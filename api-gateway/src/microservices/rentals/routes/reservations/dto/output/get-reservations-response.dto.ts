import { ApiProperty } from "@nestjs/swagger";
import { ResponseFormat } from "src/common/dto/responses";
import { HouseResponseDTO } from "../../../houses/dto/output";

class GetReservationsResponseDataDTO{
    @ApiProperty({type: String})
    id: string;
    @ApiProperty({type: String})
    startDate:string;
    @ApiProperty({type: String})
    endDate:string;
    @ApiProperty({type: HouseResponseDTO})
    house: HouseResponseDTO;
    @ApiProperty({type: String})
    userWhoReservatedId: string;
    @ApiProperty({type: String})
    discountCode:string;
}

export class GetReservationsResponseDTO extends ResponseFormat<GetReservationsResponseDataDTO> {
    @ApiProperty({type: GetReservationsResponseDataDTO })
    data: GetReservationsResponseDataDTO;
}