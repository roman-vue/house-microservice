import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { MessageQueues } from './utils/enums';

async function bootstrap() {
  const configService = new ConfigService();
  const app = await NestFactory.createMicroservice(AppModule,{
    transport: Transport.RMQ,
    options: {
      urls: [configService.get<string>('AMQP_URL')],
      queue: MessageQueues.rentals
    }
  });
  await app.listen();
}
bootstrap();
