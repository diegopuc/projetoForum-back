import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './modules/app/app.module';
import * as express from 'express';
import * as cors from 'cors';
import * as fs from 'fs';
import * as https from 'https';

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync('path/to/private-key.pem'), // Caminho para sua chave privada
    cert: fs.readFileSync('path/to/certificate.pem'), // Caminho para seu certificado
    secureProtocol: 'TLSv1_2_method', // Força o uso do protocolo TLS 1.2
  };

  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });

  app.use(cors());
  app.enableCors({
    origin: '*', // Ajuste conforme necessário
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Accept',
      'Content-Type',
      'Authorization',
      'X-Requested-With',
    ],
    optionsSuccessStatus: 204, // Responder com status 204 para requisições OPTIONS
  });

  // Middleware para lidar com as requisições OPTIONS manualmente, se necessário
  app.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS");
      res.header("Access-Control-Allow-Headers", "Accept, Content-Type, Authorization, X-Requested-With");
      return res.status(204).end();
    }
    next();
  });

  const config = new DocumentBuilder()
    .setTitle('backend-utip')
    .setDescription('The utip API description')
    .setVersion('1.0')
    .addTag('')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.setGlobalPrefix('api');
  const port = process.env.PORT || 3000;
  await app.listen(port);
}
bootstrap();
