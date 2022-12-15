import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { House } from 'src/database/src/entities';
import { HousesController } from './houses.controller';
import { HousesService } from './houses.service';

@Module({
  imports: [TypeOrmModule.forFeature([House])],
  controllers: [HousesController],
  providers: [HousesService],
  exports: [HousesService],
})
export class HousesModule {}
