import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { MongoRepository } from 'typeorm';
import { paginateResponse } from 'src/common';
import { ObjectId } from 'mongodb';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: MongoRepository<Todo>,
  ) {}

  create(userId: string, createTodoDto: CreateTodoDto) {
    return this.todoRepository.save({
      ...createTodoDto,
      userId: userId,
    });
  }

  async findPaginate(userId: string, page: number, limit: number) {
    const skip = (page - 1) * limit;
    const todos = await this.todoRepository.findAndCount({
      where: { userId: userId },
      skip: skip,
      take: limit,
      order: { createdAt: 'DESC' },
    });
    return paginateResponse(todos, page, limit);
  }

  async update(id: string, updateTodoDto: UpdateTodoDto) {
    return this.todoRepository.update(id, updateTodoDto);
  }

  async remove(id: string) {
    return this.todoRepository.delete(id);
  }

  async findOne(id: string) {
    return this.todoRepository.findOne({ where: { _id: new ObjectId(id) } });
  }
}
