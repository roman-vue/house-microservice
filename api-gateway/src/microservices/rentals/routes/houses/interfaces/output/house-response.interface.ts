import { IUser } from "src/microservices/auth/routes/users/interfaces/output";


export interface IHouseResponse {
    id: string;
    name: string;
    address: string;
    userOwner: IUser;

}