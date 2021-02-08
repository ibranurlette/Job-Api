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
  CacheKey,
  CacheTTL,
  UseInterceptors,
  CacheInterceptor,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobDTO } from './dtos/job.dto';
import { Job } from './interfaces/job.interface';
import { JobData } from '../decorators/jobdata.decorator';
import { ValidationExceptionFilter } from '../filters/validation-exception.filter';
import { ValidationPipe } from '../pipes/validation';
import { BenchmarkInterceptor } from '../interceptors/benchmark.interceptor';

@Controller('jobs')
@UseInterceptors(CacheInterceptor, BenchmarkInterceptor)
export class JobsController {
  constructor(private readonly jobService: JobsService) {}
  @Get()
  @CacheKey('allJobs')
  @CacheTTL(15)
  findAll(): Promise<Job[]> {
    return this.jobService.findAll();
  }

  @Get(':id')
  @CacheTTL(30)
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

  @Post()
  // @UseFilters(new ValidationExceptionFilter())
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
