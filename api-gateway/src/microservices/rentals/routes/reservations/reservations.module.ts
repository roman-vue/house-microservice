import { Module } from '@nestjs/common';
import { ProxyModule } from 'src/configuration/proxy';
import { GuardsModule } from 'src/guards';
import { ReservationsController } from './reservations.controller';

@Module({
  imports:[
    GuardsModule,
    ProxyModule
  ],
  controllers: [ReservationsController]
})
export class ReservationsModule {}
