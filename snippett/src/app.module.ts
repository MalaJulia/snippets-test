import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SnippetController } from './snippet/snippet.controller';
import { SnippetModule } from './snippet/snippet.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB!),
    SnippetModule,
    AuthModule,

  ],
  controllers: [AppController, SnippetController],
  providers: [AppService],
})
export class AppModule {}
