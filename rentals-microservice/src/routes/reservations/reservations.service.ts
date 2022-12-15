import { Injectable } from '@nestjs/common';
import { IReservation } from 'src/database/src/interfaces/reservations';
import { ReservationRepository } from 'src/database/src/repositories/reservations';
import { HousesService } from '../houses';
import { ICreateReservation } from './interfaces/input';

@Injectable()
export class ReservationsService {

    constructor(
        private readonly housesService: HousesService,
        private readonly reservationRepository: ReservationRepository
    ){}

    public async getReservations(){
        return await this.reservationRepository.find({relations:["house"],loadRelationIds:false});
    }

    public async createReservation( createReservationData: ICreateReservation ) : Promise<IReservation> {
        const { houseId, ...restOfCreateReservationData } = createReservationData;
        const houseFound = await this.housesService.getHouseById(houseId);
        const newReservationInstance = await this.reservationRepository.create({house:houseFound, ...restOfCreateReservationData});
        return await this.reservationRepository.save(newReservationInstance);
    }

}
