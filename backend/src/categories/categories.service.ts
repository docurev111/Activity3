import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private repo: Repository<Category>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  async create(data: Partial<Category>) {
    // Check if category with same name already exists
    const existingCategory = await this.repo.findOne({ 
      where: { name: data.name } 
    });
    
    if (existingCategory) {
      throw new ConflictException(`Category "${data.name}" already exists`);
    }
    
    const category = this.repo.create(data);
    return this.repo.save(category);
  }

  update(id: number, data: Partial<Category>) {
    return this.repo.update(id, data);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
