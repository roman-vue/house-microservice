import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RoutesBasePaths } from 'src/utils/enums';
import * as basicAuth from 'express-basic-auth';

export class SwaggerConfig {

    public static configSwaggerModule(app: INestApplication): void {

        const configService = new ConfigService();
        const swaggerPassword: string = configService.get('SWAGGER_PASSWORD');
        const swaggerUser : string = configService.get('SWAGGER_USER');

        app.use(RoutesBasePaths.docs, basicAuth({ challenge: true, users: { [`${swaggerUser}`]: swaggerPassword } }));

        const swaggerOptions = new DocumentBuilder()
            .addBearerAuth()
            .setTitle('API GATEWAY')
            .setDescription('API GATEWAY OF MICROSERVICES TEST DOCUMENTATION')
            .setVersion(`1.0.0`)
            .build();
            
        const swaggerDocument = SwaggerModule.createDocument(app, swaggerOptions);
        SwaggerModule.setup(RoutesBasePaths.docs, app, swaggerDocument, {
            swaggerOptions: {
                filter: true
            }
        });
        
    }

}