import { Injectable } from '@nestjs/common';
import { Job } from './interfaces/job.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class JobsService {
  constructor(@InjectModel('Job') private readonly jobModel: Model<Job>) {}
  // findOne Job
  async find(id: string): Promise<Job> {
    return await this.jobModel.findOne({ _id: id });
  }
  // findAll Job
  async findAll(): Promise<Job[]> {
    return await this.jobModel.find();
  }
  // create Job
  async create(job: Job): Promise<Job> {
    const newJob = new this.jobModel(job);
    return await newJob.save();
  }
  // Update Job
  async update(id: string, job: Job): Promise<Job> {
    return await this.jobModel.findByIdAndUpdate(id, job, { new: true });
  }
  // Delete Job
  async delete(id: string): Promise<Job> {
    return await this.jobModel.findByIdAndRemove(id);
  }
}
