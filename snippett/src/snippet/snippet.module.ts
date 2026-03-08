import { Snippet, SnippetSchema } from './schema/snippet.schema';
import { Module } from '@nestjs/common';
import { SnippetService } from './snippet.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SnippetController } from './snippet.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Snippet.name, schema: SnippetSchema }]),
  ],
  controllers: [SnippetController],
  providers: [SnippetService],
  exports: [SnippetService],
})
export class SnippetModule {}
