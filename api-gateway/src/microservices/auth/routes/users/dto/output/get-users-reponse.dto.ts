
import { ApiProperty } from "@nestjs/swagger";
import { ResponseFormat } from "src/common/dto/responses";
import { UserResponseDTO } from "./user-response.dto";

export class GetUsersResponseDTO extends ResponseFormat<UserResponseDTO[]> {

    @ApiProperty({type: [UserResponseDTO]})
    data: UserResponseDTO[];

}
