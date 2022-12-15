import { ApiProperty } from "@nestjs/swagger";
import { UserResponseDTO } from "src/microservices/auth/routes/users/dto/output";

export class HouseResponseSecondaryDTO {

    @ApiProperty({type: String})
    id: string;
    @ApiProperty({type: String})
    name: string;
    @ApiProperty({type: String})
    address: string;
    @ApiProperty({type: UserResponseDTO})
    userOwner: UserResponseDTO

}