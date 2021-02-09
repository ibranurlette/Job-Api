import { Module } from '@nestjs/common';
import { JobsModule } from './jobs/jobs.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    JobsModule,
    MongooseModule.forRoot('mongodb://localhost:27017/jobs'),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
