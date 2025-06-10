import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../task.entity';
import { User } from '../user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(userId: number) {
    return this.tasksRepository.find({ where: { user: { id: userId } } });
  }

  async findOne(id: number, userId: number) {
    const task = await this.tasksRepository.findOne({ where: { id }, relations: ['user'] });
    if (!task) throw new NotFoundException('Task not found');
    if (task.user.id !== userId) throw new ForbiddenException('Access denied');
    return task;
  }

  async create(data: any, userId: number) {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');
    const task = this.tasksRepository.create({ ...data, user });
    return this.tasksRepository.save(task);
  }

  async update(id: number, data: any, userId: number) {
    const task = await this.findOne(id, userId);
    Object.assign(task, data);
    return this.tasksRepository.save(task);
  }

  async remove(id: number, userId: number) {
    const task = await this.findOne(id, userId);
    return this.tasksRepository.remove(task);
  }
}
