import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common';
import { CurrentUser } from 'src/common/decorators';

@Controller('todo')
@ApiTags('Todo')
@ApiBearerAuth()
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @CurrentUser('_id') userId: string,
    @Body() createTodoDto: CreateTodoDto,
  ): Promise<any> {
    return this.todoService.create(userId, createTodoDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(
    @CurrentUser('_id') userId: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<any> {
    return this.todoService.findPaginate(userId, page, limit);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const todo = await this.todoService.findOne(id);
    if (todo == null) throw new NotFoundException('Todo not found');
    return todo;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoService.remove(id);
  }
}
