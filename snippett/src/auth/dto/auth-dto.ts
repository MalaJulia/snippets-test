import {
    IsDate,
    IsNotEmpty,
    IsString,
    IsOptional,
    IsEmail
  } from '@nestjs/class-validator';
  import { Type } from 'class-transformer';;

  export class AuthDto {
    @IsString()
    @IsOptional()
    _id: string;
  
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;
  
    @IsString()
    @IsNotEmpty()
    password: string;
  
    @IsOptional()
    @Type(() => Date)
    @IsDate()
    createdAt: Date;
  
    @IsOptional()
    @IsDate()
    updateAt: Date;
  }