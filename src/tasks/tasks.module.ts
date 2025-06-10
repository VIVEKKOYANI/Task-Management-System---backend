import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from '../task.entity';
import { User } from '../user.entity';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Task, User])],
  providers: [TasksService],
  controllers: [TasksController],
})
export class TasksModule {}
