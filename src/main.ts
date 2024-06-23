import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './modules/app/app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors({
    origin: 'https://main.d2zml6m6uc2eec.amplifyapp.com', // origem permitida
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true, // se necessário
  });
  const config = new DocumentBuilder()
    .setTitle('backend-utip')
    .setDescription('The utip API description')
    .setVersion('1.0')
    .addTag('')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)
  app.setGlobalPrefix('api')
  await app.listen(3000)
}
bootstrap()
