import { IsString, IsOptional, IsIn, IsDateString } from 'class-validator';

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsIn(['To Do', 'In Progress', 'Completed'])
  @IsOptional()
  status?: string;

  @IsDateString()
  @IsOptional()
  due_date?: string;
}
