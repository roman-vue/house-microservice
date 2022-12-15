
export interface ICreateReservation {
    startDate: Date;
    endDate: Date;
    userWhoReservatedId: string;
    houseId: string;
    discountCode:string;
}