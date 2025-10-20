import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { Author } from './author.entity';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly service: AuthorsService) {}

  @Get()
  findAll(): Promise<Author[]> {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Author | null> {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() data: Partial<Author>): Promise<Author> {
    return this.service.create(data);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: Partial<Author>) {
    return this.service.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.remove(id);
  }
}
