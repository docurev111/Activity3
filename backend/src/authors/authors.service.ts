import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from './author.entity';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private repo: Repository<Author>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  async create(data: Partial<Author>) {
    // Check if author with same name already exists
    const existingAuthor = await this.repo.findOne({ 
      where: { name: data.name } 
    });
    
    if (existingAuthor) {
      throw new ConflictException(`Author "${data.name}" already exists`);
    }
    
    const author = this.repo.create(data);
    return this.repo.save(author);
  }

  update(id: number, data: Partial<Author>) {
    return this.repo.update(id, data);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
