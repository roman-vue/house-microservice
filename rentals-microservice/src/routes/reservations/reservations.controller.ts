import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { IReservation } from 'src/database/src/interfaces/reservations';
import { ReservationsMessages } from 'src/utils/enums';
import { CreateReservationDTO } from './dto/input';
import { ReservationsService } from './reservations.service';

@Controller()
export class ReservationsController {

    constructor(private reservationsService: ReservationsService){}

    @MessagePattern(ReservationsMessages.GET_RESERVATIONS)
    public getReservations() : Promise<IReservation[]> {
        return this.reservationsService.getReservations();
    }

    @MessagePattern(ReservationsMessages.CREATE_RESERVATION)
    public createReservation(@Payload() createReservationDTO : CreateReservationDTO ) : Promise<IReservation> {
        return this.reservationsService.createReservation(createReservationDTO);
    }

}
