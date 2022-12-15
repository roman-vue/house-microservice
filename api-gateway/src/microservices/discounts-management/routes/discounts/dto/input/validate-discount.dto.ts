import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class ValidateDiscountDTO {
    @ApiProperty({type: String})
    @IsNotEmpty()
    @IsString()
    readonly discountCode: string;
    @ApiProperty({type: String})
    @IsNotEmpty()
    @IsUUID()
    readonly houseId: string;
    @ApiProperty({type: String})
    @IsNotEmpty()
    @IsUUID()
    readonly userId: string;
}