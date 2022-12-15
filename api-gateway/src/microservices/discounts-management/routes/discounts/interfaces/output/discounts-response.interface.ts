import { IUser } from "src/microservices/auth/routes/users/interfaces/output";
import { IHouse } from "src/microservices/rentals/routes/houses/interfaces/output";


export class IDiscountResponse {
    id: string;
    code: string;
    house: IHouse;
    user: IUser;
}