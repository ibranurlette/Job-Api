import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { ValidationExceptionFilter } from './filters/validation-exception.filter';
// import { ValidationPipe } from './pipes/validation';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // app.useGlobalFilters(new HttpExceptionFilter());
  // app.useGlobalFilters(new ValidationExceptionFilter());
  // app.useGlobalPipes(new ValidationPipe());

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  // app.setViewEngine('pug');
  app.setViewEngine('hbs');
  await app.listen(3000);
}
bootstrap();
