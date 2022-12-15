import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as entities from './entities';

const listEntities = Object.values(entities);

export const databaseProvider = TypeOrmModule.forRootAsync({
  imports: [ConfigModule.forRoot({})],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    return {
      type: 'postgres',
      host: configService.get<string>('PGHOST_DISCOUNTS'),
      port: configService.get<number>('PGPORT_DISCOUNTS'),
      username: configService.get<string>('PGUSER_DISCOUNTS'),
      password: configService.get<string>('PGPASSWORD_DISCOUNTS'),
      database: configService.get<string>('PGDATABASE_DISCOUNTS'),
      entities: listEntities,
      synchronize: true,
      logging: false,
      cache: {
        duration: 1500,
      },
    };
  },
});
