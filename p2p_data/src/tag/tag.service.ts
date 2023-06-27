import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { TagRepository } from './tag.repository';
import { Tag } from 'src/entities/tag.entity';
import { Training } from 'src/entities/training.entity';
import { TrainingRepository } from 'src/training/training.repository';
import { ChapterRepository } from 'src/chapter/chapter.repository';

@Injectable()
export class TagService {
    constructor(
        @Inject(TagRepository)
        private readonly tagRepository: TagRepository,

        @Inject(TrainingRepository)
        private readonly trainingRepository: TrainingRepository,

        @Inject(ChapterRepository)
        private readonly chapterRepository: ChapterRepository,
    ) {}

    async getAllTags(): Promise<Tag[]> {
        const tags = await this.tagRepository.getAllTags();
        return [ ... tags ]; //Unpack tags to not send a reference (to avoid modifying the original array)
        }

    async getTagById(tagId: number): Promise<Tag> {
        const tag = await this.tagRepository.getTagByID(tagId);
        if(!tag){
            throw new NotFoundException('Tag not found');
        }
        return { ... tag };
    }

    async createTag(name: string, chaptersIds: number[]): Promise<Tag> {
        let chapters = [];
        for(let chapterIds of chaptersIds) { 
            let chapter = await this.chapterRepository.getChapterByID(chapterIds); 
            if(chapter) chapters.push(chapter);
        }

        const tag = await this.tagRepository.createTag(name, chapters);
        return { ... tag }; // Unpack elements and create a new object to avoid sending references.
    }

    async updateTag(tagId: number, name: string, isActive: boolean, trainingsId: number[],  chaptersIds: number[]): Promise<Tag> {
        const currentTag = await this.getTagById(tagId);
        let trainings = new Array();
        let chapters = [];

        if(trainingsId.length > 0 || chaptersIds.length >0){
            //Get all trainings by given trainings Id
            for(let trainingId of trainingsId) { 
                let training = await this.trainingRepository.getTrainingByID(trainingId); 
                if(training) trainings.push(training);
            }
            for(let chapterId of chaptersIds) { 
                let chapter = await this.chapterRepository.getChapterByID(chapterId); 
                if(chapter) chapters.push(chapter);
            }
        }
        
        const tag = await this.tagRepository.updateTag(currentTag, name, isActive, trainings, chapters);
        return { ... tag };
    
    }

    // async deleteTag(tagId: number): Promise<string> {
    //     if(await this.tagRepository.getTagByID(tagId)){
    //         this.tagRepository.deleteTag(tagId);
    //         return "Tag deleted";
    //     }
    // }     
}
