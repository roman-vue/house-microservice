import { IUser } from "src/microservices/auth/routes/users/interfaces/output";
import { IHouse } from "../../../houses/interfaces/output";


export interface ICreateReservationResponse {
    id: string;
    startDate: Date;
    endDate: Date;
    userWhoReservated: IUser;
    house: IHouse;
    discountCode:string;
}