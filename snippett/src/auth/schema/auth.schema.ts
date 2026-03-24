import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AuthDocument = HydratedDocument<Auth>;

@Schema({ timestamps: true })
export class Auth {
  @Prop()
  id: number;

  @Prop({required:true, trim: true})
  email: string;

  @Prop({required:true, trim: true})
  password:string;

  createdAt: Date
  updatedAt: Date
}

export const AuthSchema  = SchemaFactory.createForClass(Auth);
