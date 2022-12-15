import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationRepository } from 'src/database/src/repositories/reservations';
import { HousesModule } from '../houses';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      ReservationRepository
    ]),
    HousesModule
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService]
})
export class ReservationsModule {}
