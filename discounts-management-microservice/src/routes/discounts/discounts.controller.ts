import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { IDiscount } from 'src/database/src/interfaces/discounts';
import { DiscountMessages } from 'src/utils/enums';
import { DiscountsService } from './discounts.service';
import { RegisterDiscountDTO, ValidateDiscountDTO } from './dto/input';
import { IDeleteDiscountRegisterResponse, IValidateDiscountResponse } from './interfaces/output';

@Controller()
export class DiscountsController {

    constructor( private readonly discountsService: DiscountsService ){}

    @MessagePattern(DiscountMessages.GET_ALL_DISCOUNTS)
    public getAllDiscounts() : Promise<IDiscount[]> {
        return this.discountsService.getAllDiscounts();
    }

    @MessagePattern(DiscountMessages.GET_USER_DISCOUNTS)
    public getUserDiscounts(@Payload() userId: string ) : Promise<IDiscount[]> {
        return this.discountsService.getUserDiscounts(userId);
    }

    @MessagePattern(DiscountMessages.GET_DISCOUNT_BY_CODE)
    public getDiscountByCode(@Payload() discountCode: string ) : Promise<IDiscount> {
        return this.discountsService.getDiscountByCode(discountCode);
    }

    @MessagePattern(DiscountMessages.VALIDATE_DISCOUNT)
    public validateDiscount(@Payload() validateDiscountDTO : ValidateDiscountDTO ) : Promise<IValidateDiscountResponse> {
        return this.discountsService.validateDiscount(validateDiscountDTO);
    }

    @MessagePattern(DiscountMessages.REGISTER_DISCOUNT)
    public registerDiscount(@Payload() registerDiscountDTO : RegisterDiscountDTO ) : Promise<IDiscount> {
        return this.discountsService.registerDiscount(registerDiscountDTO);
    }

    @MessagePattern(DiscountMessages.DELETE_DISCOUNT)
    public deleteDiscount(@Payload() discountRegisterId: string ) : Promise<IDeleteDiscountRegisterResponse> {
        return this.discountsService.deleteDiscountRegister(discountRegisterId);
    }


}
