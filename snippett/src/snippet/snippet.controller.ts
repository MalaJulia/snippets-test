import { Snippet } from './schema/snippet.schema';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Query,
} from '@nestjs/common';
import {
  SnippetDto,
  PaginationQueryDto,
  PaginationResponse,
} from './dto/snippet-dto';
import { SnippetService } from './snippet.service';

@Controller('snippet')
export class SnippetController {
  constructor(private readonly snippetService: SnippetService) {}

  @Get()
  getAll(
    @Query() query: PaginationQueryDto,
  ): Promise<PaginationResponse<Snippet>> {
    return this.snippetService.getAll(query);
  }

  @Post()
  createSnippet(@Body() createSnippetDto: SnippetDto) {
    return this.snippetService.createSnippet(createSnippetDto);
  }
  @Get('/:id')
  getById(@Param('id') id: string): Promise<Snippet | null> {
    return this.snippetService.getById(id);
  }

  @Patch('/:id')
  async updateSnippet(@Param('id') id: string, @Body() updateDto: SnippetDto) {
    return this.snippetService.updateSnippet(id, updateDto);
  }
}
