import { ICreateHouse } from "../../interfaces/input";

export class CreateHouseDTO implements ICreateHouse {
    readonly name: string;
    readonly address: string;
    readonly userOwnerId: string;
}