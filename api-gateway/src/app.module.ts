import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthenticationModule } from './microservices/auth/routes/authentication';
import { UsersModule } from './microservices/auth/routes/users';
import { DiscountsModule } from './microservices/discounts-management/routes/discounts';
import { ReservationsModule } from './microservices/rentals/routes/reservations/reservations.module';
import { HousesModule } from './microservices/rentals/routes/houses/houses.module';

@Module({
  imports: [
    ConfigModule.forRoot({envFilePath:'.env',isGlobal:true}),
    AuthenticationModule,
    UsersModule,
    DiscountsModule,
    ReservationsModule,
    HousesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
