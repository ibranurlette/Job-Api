import { Document } from 'mongoose';
import { IsString, IsInt } from 'class-validator';

export class JobDTO extends Document {
  @IsString()
  readonly title: string;

  @IsInt()
  readonly salary: number;
}
