import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './modules/app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Use a configuração de CORS do NestJS
  // app.enableCors({
  //   origin: 'https://main.d2zml6m6uc2eec.amplifyapp.com', // Ajuste conforme necessário
  //   methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  //   allowedHeaders: ['Accept', 'Content-Type', 'Authorization', 'X-Requested-With'],
  //   credentials: true,
  //   optionsSuccessStatus: 204,
  // });

  // // Adicione middleware personalizado para headers CORS
  // app.use((req, res, next) => {
  //   res.header("Access-Control-Allow-Origin", "*");
  //   res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS");
  //   res.header("Access-Control-Allow-Headers", "Accept, Content-Type, Authorization, X-Requested-With");
  //   // Se for uma requisição OPTIONS, responda com 204 No Content
  //   if (req.method === 'OPTIONS') {
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
