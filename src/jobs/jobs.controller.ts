import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpException,
  HttpStatus,
  UseFilters,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobDTO } from './dtos/job.dto';
import { Job } from './interfaces/job.interface';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobService: JobsService) {}
  @Get(':id')
  find(@Param('id') id): Promise<Job> {
    return this.jobService
      .find(id)
      .then((result) => {
        if (result) {
          return result;
        } else {
          throw new HttpException('Job Not Found', HttpStatus.NOT_FOUND);
        }
      })
      .catch(() => {
        throw new HttpException('Job Not Found', HttpStatus.NOT_FOUND);
      });
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
