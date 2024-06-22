import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from '../auth/auth.module'
import { ProcessModule } from '../process/process.module'
import { UserModule } from '../user/user.module'

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://695056:WGZv2cs18ZbE5ee4@test.srculmn.mongodb.net/?retryWrites=true&w=majority&appName=test',
      //'mongodb+srv://695056:WGZv2cs18ZbE5ee4@mongodb.tr8mlcr.mongodb.net/?retryWrites=true&w=majority',
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

