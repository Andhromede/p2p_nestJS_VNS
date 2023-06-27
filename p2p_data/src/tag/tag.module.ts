import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { TagRepository } from './tag.repository';
import { TrainingRepository } from 'src/training/training.repository';
import { ChapterRepository } from 'src/chapter/chapter.repository';

@Module({
  providers: [TagService, TagRepository, TrainingRepository, ChapterRepository],
  controllers: [TagController]
})
export class TagModule {}
