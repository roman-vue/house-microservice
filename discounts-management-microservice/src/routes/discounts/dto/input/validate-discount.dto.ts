import { IValidateDiscount } from "../../interfaces/input";

export class ValidateDiscountDTO implements IValidateDiscount {
    readonly discountCode: string;
    readonly houseId: string;
    readonly userId: string;
}