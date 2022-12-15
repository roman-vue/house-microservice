import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from 'src/database/entities';
import { IReservation } from 'src/database/interfaces/reservations';
import { Repository } from 'typeorm';
import { HousesService } from '../houses';
import { ICreateReservation } from './interfaces/input';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
    private readonly housesService: HousesService,
  ) {}

  public async getReservations() {
    return await this.reservationRepository.find({
      relations: ['house'],
      loadRelationIds: false,
    });
  }

  public async createReservation(
    createReservationData: ICreateReservation,
  ): Promise<IReservation> {
    const { houseId, ...restOfCreateReservationData } = createReservationData;
    const houseFound = await this.housesService.getHouseById(houseId);
    const newReservationInstance = await this.reservationRepository.create({
      house: houseFound,
      ...restOfCreateReservationData,
    });
    return await this.reservationRepository.save(newReservationInstance);
  }
}
