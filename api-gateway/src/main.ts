import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionFilter } from './configuration/filters';
import { LoggingInterceptor, TimeOutInterceptor } from './configuration/interceptors';
import { SwaggerConfig } from './configuration/swagger';
import { LoggerService } from './configuration/logger';
import { ResponseInterceptor } from './configuration/interceptors/response.interceptor';

async function bootstrap() {
  const configService = new ConfigService();
  const logger = new LoggerService();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalInterceptors(
    new LoggingInterceptor(logger), 
    new TimeOutInterceptor(),
    new ResponseInterceptor()
  );
  app.useGlobalFilters(new AllExceptionFilter());
  SwaggerConfig.configSwaggerModule(app);
  const port = configService.get<string>('PORT') || 3000 ;
  await app.listen(port);
}
bootstrap();
