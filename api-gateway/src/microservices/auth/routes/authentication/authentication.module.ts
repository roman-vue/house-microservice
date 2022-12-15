import { Module } from '@nestjs/common';
import { ProxyModule } from 'src/configuration/proxy';
import { GuardsModule } from 'src/guards/guards.module';
import { AuthenticationController } from './authentication.controller';

@Module({
  imports:[
    ProxyModule
  ],
  controllers: [AuthenticationController]
})
export class AuthenticationModule {}
