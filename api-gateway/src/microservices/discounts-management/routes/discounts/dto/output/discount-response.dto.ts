import { ApiProperty } from "@nestjs/swagger";
import { UserResponseDTO } from "src/microservices/auth/routes/users/dto/output";
import { HouseResponseDTO } from "src/microservices/rentals/routes/houses/dto/output";

export class DiscountResponseDTO {
    @ApiProperty({type: String})
    id: string;

    @ApiProperty({type: String})
    code: string;

    @ApiProperty({type: UserResponseDTO})
    user: UserResponseDTO;

    @ApiProperty({type: HouseResponseDTO})
    house: HouseResponseDTO;
}