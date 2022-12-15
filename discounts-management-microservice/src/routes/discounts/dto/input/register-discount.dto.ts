import { IRegisterDiscount } from "../../interfaces/input";

export class RegisterDiscountDTO implements IRegisterDiscount {
    readonly houseId: string;
    readonly userId: string;
}