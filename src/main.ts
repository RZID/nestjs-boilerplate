import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import AppModule from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  if (process.env.APP_ENV !== 'prd') {
    const doc = new DocumentBuilder()
      .setTitle(`NestJS API - ${process.env.APP_ENV}`)
      .setDescription('API documentation')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, doc);
    SwaggerModule.setup('swagger', app, document, {
      swaggerOptions: {
        persistAuthorization: true,
      },
      explorer: true,
    });
  }

  await app.listen(process.env.PORT);
}
bootstrap();
