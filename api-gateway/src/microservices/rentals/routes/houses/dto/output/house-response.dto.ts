import { ApiProperty } from "@nestjs/swagger";


export class HouseResponseDTO {

    @ApiProperty({type: String})
    id: string;
    @ApiProperty({type: String})
    name: string;
    @ApiProperty({type: String})
    address: string;
    @ApiProperty({type: String})
    userOwnerId: string

}