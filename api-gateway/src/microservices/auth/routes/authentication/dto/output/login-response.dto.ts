import { ApiProperty } from "@nestjs/swagger";
import { ResponseFormat } from "src/common/dto/responses";

class LoginResponseDataDTO {
    @ApiProperty({type: String})
    token: string;
}

export class LoginResponseDTO extends ResponseFormat<LoginResponseDataDTO> {

    @ApiProperty({type: LoginResponseDataDTO})
    data: LoginResponseDataDTO;

}
