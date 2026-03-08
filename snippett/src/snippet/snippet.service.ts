import {
  SnippetDto,
  PaginationQueryDto,
  PaginationResponse,
} from './dto/snippet-dto';
import { Snippet, SnippetDocument } from './schema/snippet.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class SnippetService {
  constructor(
    @InjectModel(Snippet.name) private snippetModel: Model<SnippetDocument>,
  ) {}

  async getAll(
    query: PaginationQueryDto,
  ): Promise<PaginationResponse<Snippet>> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 5;
    const skip = (page - 1) * limit;

    const filter: any = {};

    if (query.search) {
      filter.$text = { $search: query.search };
    }

    if (query.tags) {
      const tagsSnippet = query.tags.split(',');
      filter.tags = { $in: tagsSnippet };
    }

    const [items, total] = await Promise.all([
      this.snippetModel.find(filter).skip(skip).limit(limit).lean().exec(),
      this.snippetModel.countDocuments(filter),
    ]);
    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getById(id: string): Promise<Snippet | null> {
    return this.snippetModel.findOne({ _id: id }).exec();
  }

  async createSnippet(createSnippetDto: SnippetDto): Promise<Snippet> {
    const createdSnippet = new this.snippetModel(createSnippetDto);
    return createdSnippet.save();
  }

  async updateSnippet(
    id: string,
    updateDto: SnippetDto,
  ): Promise<Snippet | null> {
    const updated = await this.snippetModel
      .findByIdAndUpdate(id, updateDto, { new: true })
      .lean()
      .exec();
    if (!updated)
      throw new NotFoundException(`Snippet with id ${id} not found`);
    return updated;
  }
}
