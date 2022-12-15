import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/src';
import { HousesModule } from './routes/houses/houses.module';
import { ReservationsModule } from './routes/reservations/reservations.module';

@Module({
  imports: [
    ConfigModule.forRoot({envFilePath:'.env',isGlobal:true}),
    DatabaseModule,
    HousesModule,
    ReservationsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
