import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID } from "class-validator";

export class RegisterDiscountDTO {
    @ApiProperty({type: String})
    @IsNotEmpty()
    @IsUUID()
    readonly houseId: string;
    @ApiProperty({type: String})
    @IsNotEmpty()
    @IsUUID()
    readonly userId: string;
}