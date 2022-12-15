import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsDateString, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateReservationDTO  {
    @ApiProperty({type:String})
    @IsNotEmpty()
    @IsDateString()
    readonly startDate: Date;
    @ApiProperty({type:String})
    @IsNotEmpty()
    @IsDateString()
    readonly endDate: Date;
    @ApiProperty({type:String})
    @IsString()
    @IsUUID()
    readonly userWhoReservatedId: string;
    @ApiProperty({type:String})
    @IsUUID()
    @IsUUID()
    readonly houseId: string;
    @ApiProperty({type:String})
    @IsOptional()
    @IsString()
    readonly discountCode: string;
}