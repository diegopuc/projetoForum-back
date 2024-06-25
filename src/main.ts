import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './modules/app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'https://main.d2zml6m6uc2eec.amplifyapp.com',
      /https:\/\/main\.d2zml6m6uc2eec\.amplifyapp\.com\/.*/,
      // 'http://localhost:5173',
    ], // Ajuste conforme necessário
    // origin: 'https://main.d2zml6m6uc2eec.amplifyapp.com', // Ajuste conforme necessário
    // origin: 'http://localhost:5173', // Ajuste conforme necessário
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Accept',
      'Content-Type',
      'Authorization',
      'X-Requested-With',
    ],
    credentials: true,
    optionsSuccessStatus: 204, // Responder com status 204 para requisições OPTIONS
  });

  // Middleware para lidar com as requisições OPTIONS manualmente, se necessário
  // app.use((req, res, next) => {
  //   if (req.method === 'OPTIONS') {
  //     res.header("Access-Control-Allow-Origin", "https://main.d2zml6m6uc2eec.amplifyapp.com");
  //     res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS");
  //     res.header("Access-Control-Allow-Headers", "Accept, Content-Type, Authorization, X-Requested-With");
  //     res.header("Access-Control-Allow-Credentials", "true");
  //     return res.status(204).end();
  //   }
  //   next();
  // });

  const config = new DocumentBuilder()
    .setTitle('backend-utip')
    .setDescription('The utip API description')
    .setVersion('1.0')
    .addTag('')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();
