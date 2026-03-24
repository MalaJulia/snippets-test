import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsString,
  Length,
  ArrayMinSize,
  IsOptional,
  Min,
} from '@nestjs/class-validator';
import { Type } from 'class-transformer';
import { IsInt, Max } from 'class-validator';

export class SnippetDto {
  @IsString()
  @IsOptional()
  _id: string;

  @IsString()
  @IsNotEmpty()
  @Length(1)
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @ArrayMinSize(1)
  tags: Array<string>;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  createdAt: Date;

  @IsOptional()
  @IsDate()
  updateAt: Date;
}

export class PaginationQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit: number = 5;

  @IsOptional()
  @IsString()
  search: string

  @IsOptional()
  @IsString()
  tags: string
}

export interface PaginationResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
