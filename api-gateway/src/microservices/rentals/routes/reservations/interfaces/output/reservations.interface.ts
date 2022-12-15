import { IHouse } from "../../../houses/interfaces/output";

export interface IReservation {
    id: string;
    startDate: Date;
    endDate: Date;
    userWhoReservatedId: string;
    house: IHouse;
    discountCode:string;
}