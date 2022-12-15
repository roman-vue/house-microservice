import { Module } from '@nestjs/common';
import { ProxyModule } from 'src/configuration/proxy';
import { GuardsModule } from 'src/guards';
import { HousesController } from './houses.controller';

@Module({
  imports:[
    GuardsModule,
    ProxyModule
  ],
  controllers: [HousesController]
})
export class HousesModule {}
