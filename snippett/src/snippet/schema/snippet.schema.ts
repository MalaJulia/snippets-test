import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SnippetDocument = HydratedDocument<Snippet>;

@Schema({ timestamps: true })
export class Snippet {
  @Prop()
  id: number;

  @Prop({required:true, trim: true})
  title: string;

  @Prop({required:true, trim: true})
  content:string;

  @Prop({required:true})
  tags:string[];

  @Prop({required:true, enum: ['link', 'note', 'command']}) 
  type: string;

  createdAt: Date
  updatedAt: Date
}

export const SnippetSchema  = SchemaFactory.createForClass(Snippet);

SnippetSchema.index({title: 'text', content:"text"})