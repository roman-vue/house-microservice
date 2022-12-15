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
      host: configService.get<string>('PGHOST_RENTALS'),
      port: configService.get<number>('PGPORT_RENTALS'),
      username: configService.get<string>('PGUSER_RENTALS'),
      password: configService.get<string>('PGPASSWORD_RENTALS'),
      database: configService.get<string>('PGDATABASE_RENTALS'),
      entities: listEntities,
      synchronize: true,
      logging: false,
      cache: {
        duration: 1500,
      },
    };
  },
});
