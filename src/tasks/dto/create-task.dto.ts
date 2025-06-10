import { IsString, IsNotEmpty, IsIn, IsDateString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description: string;

  @IsString()
  @IsIn(['To Do', 'In Progress', 'Completed'])
  status: string;

  @IsDateString()
  due_date: string;
}
