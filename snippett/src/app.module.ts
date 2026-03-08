import { SnippetService } from './snippet/snippet.service';
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
    SnippetModule
  ],
  controllers: [AppController, SnippetController],
  providers: [AppService],
})
export class AppModule {}
