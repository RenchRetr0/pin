import { NestFactory } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import * as cors from 'cors';
import * as express from 'express';
import { join } from 'path';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { TransformResponseInterceptor } from '@common/interceptor/transform-response.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from '@common/filter/http-exception.filter';
import { JwtAuthGuard } from '@auth/domain/strategy';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({ credentials: true, origin: true });

    const config = app.get(ConfigService);
    const port = config.get<number>('APP_PORT');
    const serverUrl = config.get<string>('SERVER_URL');

    const uploadDir = config.get<string>('UPLOAD_DIR');
    const staticUrlPath = config.get<string>('STATIC_URL_PATH');

    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalInterceptors(new TransformResponseInterceptor());
    
    app.use(staticUrlPath, express.static(uploadDir));
    app.use(
        cors({
            origin: '*',
        }),
    );
      
    const configDocument = new DocumentBuilder()
        .setTitle('SMM Doc')
        .setDescription('Swagger Super-SMM')
        .setVersion('1.0')
        .addBearerAuth()
        .addServer(serverUrl)
        .build();
    const document = SwaggerModule.createDocument(app, configDocument);
    SwaggerModule.setup('swagger', app, document, {
        swaggerOptions: { persistAuthorization: true },
    });

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            disableErrorMessages: false,
        }),
    );
    app.useGlobalGuards(
        new JwtAuthGuard(app.get(JwtService), app.get(Reflector)),
    );

    await app.listen(port || 3000);
}
bootstrap();
