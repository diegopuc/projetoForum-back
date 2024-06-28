import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from '../auth/auth.module'
import { ProcessModule } from '../process/process.module'
import { UserModule } from '../user/user.module'
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../..', 'public'), // Adjust the path as per your project structure
      exclude: ['/api*'], // Exclude API routes
    }),
    MongooseModule.forRoot(
      'mongodb+srv://695056:WGZv2cs18ZbE5ee4@test.srculmn.mongodb.net/?retryWrites=true&w=majority&appName=test',
      //'mongodb://localhost:27017/local',
    ),
    ProcessModule,
    AuthModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
//incluir cabeçalho.
export class AppModule {}

