import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './modules/app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'https://main.dw4ttizcdvtno.amplifyapp.com/', // Ajuste conforme necessário
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
  app.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
      res.header("Access-Control-Allow-Origin", "https://main.dw4ttizcdvtno.amplifyapp.com/");
      res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS");
      res.header("Access-Control-Allow-Headers", "Accept, Content-Type, Authorization, X-Requested-With");
      res.header("Access-Control-Allow-Credentials", "true");
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
