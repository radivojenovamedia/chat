import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppConfigService } from './config';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
async function chat() {
  return new Promise<NestExpressApplication>((resolve) => {
    resolve(NestFactory.create(AppModule));
  });
}
chat().then((app) => {
  const configSwagger = new DocumentBuilder()
    .setTitle('chat Backend')
    .setDescription('API description')
    .setVersion('1.0')
    .addTag('chat Backend')
    .build();
  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api', app, document);
  const logger = new Logger();
  const appConfig: AppConfigService = app.get(AppConfigService);
  const port = appConfig.port;
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.enableCors({
    origin: ['http://localhost:4200'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  });
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));

  app.setViewEngine('hbs');

  // app.use(csurf());
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", 'https://cdn.jsdelivr.net'],
        formAction: ["'self'", 'https://chat.shop'],
      },
    }),
  );
  app.use(cookieParser());
  app.use(bodyParser.json({ limit: '256mb' }));
  app.use(bodyParser.urlencoded({ limit: '256mb', extended: true }));
  app.listen(port.toString()).then(() => {
    logger.log('App listen on port : ' + port, 'Start');
  });
});
