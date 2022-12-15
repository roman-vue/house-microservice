import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/database/src';
import { DiscountsModule } from './routes/discounts';

@Module({
  imports: [
    ConfigModule.forRoot({envFilePath:'.env',isGlobal:true}),
    DatabaseModule,
    DiscountsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
