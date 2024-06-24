import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './modules/app/app.module';
const cors = require('cors');
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cors())

   app.enableCors({
     origin: 'projetoforum-front.onrender.com', // Adjust according to your needs
     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
     preflightContinue: false,
     optionsSuccessStatus: 204,
     credentials: true,
     allowedHeaders: [
       'Accepted',
       'Content-Type',
       'Authorization',
     ]
   });

  // app.use((req, res, next) => {
  //   //Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
  //     res.header("Access-Control-Allow-Origin", "*");
  //   //Quais são os métodos que a conexão pode realizar na API
  //     res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
  //     app.use(cors());
  //     next();
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
