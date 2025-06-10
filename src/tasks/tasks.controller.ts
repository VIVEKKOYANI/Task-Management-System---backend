import { Controller, Get, Post, Put, Delete, Body, Param, Request, UseGuards } from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ValidationPipe } from '@nestjs/common';

@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll(@Request() req: ExpressRequest & { user: any }) {
    return this.tasksService.findAll(req.user.userId);
  }

  @Post()
  create(@Body(new ValidationPipe()) body: CreateTaskDto, @Request() req: ExpressRequest & { user: any }) {
    return this.tasksService.create(body, req.user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: number, @Request() req: ExpressRequest & { user: any }) {
    return this.tasksService.findOne(Number(id), req.user.userId);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body(new ValidationPipe()) body: UpdateTaskDto, @Request() req: ExpressRequest & { user: any }) {
    return this.tasksService.update(Number(id), body, req.user.userId);
  }

  @Delete(':id')
  remove(@Param('id') id: number, @Request() req: ExpressRequest & { user: any }) {
    return this.tasksService.remove(Number(id), req.user.userId);
  }
}
