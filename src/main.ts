import { NestFactory } from '@nestjs/core';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  app.enableCors();

  app.setGlobalPrefix('api');


  const config = new DocumentBuilder()
    .setTitle('Hakbah Apis')
    .setDescription('Set of apis for usage for mobile and frotend frameworks')
    .setVersion('1.0')
    .addTag('Signup, login, CRUDS')
    .addBearerAuth({type: 'http', scheme: 'bearer', bearerFormat: 'jwt'}, 'JWT')
    .build();

  
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);


  await app.listen(3001);
}
bootstrap();
