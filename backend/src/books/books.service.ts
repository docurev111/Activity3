import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { Author } from '../authors/author.entity';
import { Category } from '../categories/category.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private repo: Repository<Book>,
  ) {}

  findAll() {
    return this.repo.find({ relations: ['author', 'category'] });
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id }, relations: ['author', 'category'] });
  }

  async create(data: any) {
    const book = this.repo.create();
    book.title = data.title;
    
    if (data.authorId) {
      const author = await this.repo.manager.findOne(Author, { where: { id: parseInt(data.authorId) } });
      if (author) book.author = author;
    }
    
    if (data.categoryId) {
      const category = await this.repo.manager.findOne(Category, { where: { id: parseInt(data.categoryId) } });
      if (category) book.category = category;
    }
    
    return this.repo.save(book);
  }

  async update(id: number, data: any) {
    const book = await this.repo.findOne({ where: { id } });
    if (!book) throw new Error('Book not found');
    
    if (data.title !== undefined) book.title = data.title;
    
    if (data.authorId) {
      const author = await this.repo.manager.findOne(Author, { where: { id: parseInt(data.authorId) } });
      if (author) book.author = author;
    }
    
    if (data.categoryId) {
      const category = await this.repo.manager.findOne(Category, { where: { id: parseInt(data.categoryId) } });
      if (category) book.category = category;
    }
    
    return this.repo.save(book);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
