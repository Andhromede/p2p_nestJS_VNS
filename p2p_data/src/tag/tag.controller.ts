import { Controller, Get, Post, Put, Body, Param, Delete } from '@nestjs/common';
import { TagService } from './tag.service';
import { Tag } from 'src/entities/tag.entity';

@Controller('tag')
export class TagController {
    constructor(private readonly tagService: TagService) {}

    @Get()
    getAllTags(){
        return this.tagService.getAllTags();
    }

    @Get(':id')
    getTagById(@Param('id') tagId : number) {
        return this.tagService.getTagById(tagId);
    }

    @Post()
    async createTag(
        @Body('name') name: string,
        @Body('chapters') chaptersIds: number[]
    ) : Promise<Tag> {
        const generatedTag = await this.tagService.createTag(name, chaptersIds);
        return generatedTag;
    }

    @Put(':id')
    async updateTag(
        @Param('id') tagId: number,
        @Body('name') name: string,
        @Body('isActive') isActive: boolean,
        @Body('trainings') trainings: number[],
        @Body('chapters') chaptersIds: number[]
    ) : Promise<Tag> {
        const updatedTag = await this.tagService.updateTag(tagId, name, isActive, trainings, chaptersIds);
        return updatedTag;
    }

    // @Delete(':id')
    // deleteTag(@Param('id') tagId: number){
    //     return this.tagService.deleteTag(tagId);
    // }
}
