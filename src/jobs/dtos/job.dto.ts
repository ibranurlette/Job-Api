import { Document } from 'mongoose';
export class JobDTO extends Document {
  readonly title: string;
  readonly salary: number;
}
