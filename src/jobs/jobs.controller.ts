import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobDTO } from './dtos/job.dto';
import { Job } from './interfaces/job.interface';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobService: JobsService) {}
  @Get(':id')
  find(@Param('id') id): Promise<Job> {
    return this.jobService.find(id);
  }
  @Get()
  findAll(): Promise<Job[]> {
    return this.jobService.findAll();
  }

  @Post()
  create(@Body() job: JobDTO): Promise<Job> {
    return this.jobService.create(job);
  }
  @Put(':id')
  update(@Param('id') id, @Body() job: JobDTO): Promise<Job> {
    return this.jobService.update(id, job);
  }
  @Delete(':id')
  delete(@Param('id') id): Promise<Job> {
    return this.jobService.delete(id);
  }
}
