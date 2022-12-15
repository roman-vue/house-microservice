import { ICreateReservation } from "../../interfaces/input";

export class CreateReservationDTO implements ICreateReservation {
    readonly startDate: Date;
    readonly endDate: Date;
    readonly userWhoReservatedId: string;
    readonly houseId: string;
    readonly discountCode: string;
}