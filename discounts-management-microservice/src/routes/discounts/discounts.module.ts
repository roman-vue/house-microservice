import { Module } from '@nestjs/common';
import { DiscountsController } from './discounts.controller';
import { DiscountsService } from './discounts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Discount } from 'src/database/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Discount])],
  controllers: [DiscountsController],
  providers: [DiscountsService],
})
export class DiscountsModule {}
