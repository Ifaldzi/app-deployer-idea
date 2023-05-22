import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { TypeormExceptionFilter } from './common/filters/TypeormExceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('The API documentation of Auto Deploy App Project Idea')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const swaggerDoc = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, swaggerDoc);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new TypeormExceptionFilter(httpAdapter));

  await app.listen(3000);
}
bootstrap();
