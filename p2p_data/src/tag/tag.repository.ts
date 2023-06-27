import { Injectable } from "@nestjs/common";
import { Tag } from "src/entities/tag.entity";
import { Training } from "src/entities/training.entity";
import { Chapter } from "src/entities/chapter.entity";
import { DataSource } from "typeorm";

// Creation of a custom repository.
@Injectable()
export class TagRepository {
    constructor(private dataSource: DataSource){}

    tagRepository = this.dataSource.getRepository(Tag);

    getTagByID(tagId: number){
        return this.tagRepository.findOne({
            where: { id: tagId },
            relations: ['chapters']
        });
    }

    getAllTags(){
        // return this.tagRepository.find();
        return this.tagRepository
            .createQueryBuilder("tag")
            .leftJoinAndSelect("tag.chapters", "chapter")
            // .leftJoinAndSelect("tag.lessons", "lesson")
            .getMany();
    }

    createTag(name: string, chapters: Chapter[]){
        const tag = this.tagRepository.create({name, chapters});
        return this.tagRepository.save(tag);
    }

    async updateTag(currentTag: Tag, name: string, isActive: boolean, trainings: Training[], chapters: Chapter[]): Promise<Tag> {
        currentTag.name = name;
        currentTag.isActive = isActive;
        currentTag.trainings = trainings;
        currentTag.chapters = chapters;
        return await this.tagRepository.save(currentTag);
    }

    // TODO Hard delete error is :
    // "UPDATE ou DELETE sur la table « tag » viole la contrainte de clé étrangère "

    // deleteTag(tagId: number){
    //     this.tagRepository.delete(tagId);
    // }
}