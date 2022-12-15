import { EntityRepository, Repository } from 'typeorm';
import { Reservation } from '../../entities/reservations';

@EntityRepository(Reservation)
export class ReservationRepository extends Repository<Reservation> {

}
