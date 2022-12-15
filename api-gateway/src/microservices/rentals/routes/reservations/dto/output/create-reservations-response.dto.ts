import { ApiProperty } from "@nestjs/swagger";
import { ResponseFormat } from "src/common/dto/responses";
import { UserResponseDTO } from "src/microservices/auth/routes/users/dto/output";
import { HouseResponseDTO } from "../../../houses/dto/output";

class CreateReservationsResponseDataDTO{
    @ApiProperty({type: String})
    id: string;
    @ApiProperty({type: String})
    startDate:string;
    @ApiProperty({type: String})
    endDate:string;
    @ApiProperty({type:HouseResponseDTO})
    house:HouseResponseDTO;
    @ApiProperty({type: UserResponseDTO})
    userWhoReservated: UserResponseDTO;
    @ApiProperty({type: String})
    discountCode:string;
    @ApiProperty({type:String})
    deletedAt:string;
    @ApiProperty({type:String})
    createdAt:string;
    @ApiProperty({type:String})
    updatedAt:string;
}

export class CreateReservationResponseDTO extends ResponseFormat<CreateReservationsResponseDataDTO> {
    @ApiProperty({type: CreateReservationsResponseDataDTO })
    data: CreateReservationsResponseDataDTO;
}