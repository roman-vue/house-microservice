import { Module } from '@nestjs/common';
import { ProxyModule } from 'src/configuration/proxy/proxy.module';
import { GuardsModule } from 'src/guards';
import { UsersController } from './users.controller';

@Module({
  imports:[
    GuardsModule,
    ProxyModule
  ],
  controllers: [UsersController]
})
export class UsersModule {}
