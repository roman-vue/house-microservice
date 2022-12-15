import { Module } from '@nestjs/common';
import { ProxyModule } from 'src/configuration/proxy';
import { GuardsModule } from 'src/guards';
import { DiscountsController } from './discounts.controller';

@Module({
  imports:[
    GuardsModule,
    ProxyModule
  ],
  controllers: [DiscountsController]
})
export class DiscountsModule {}
