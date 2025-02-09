import { Injectable, NotFoundException } from "@nestjs/common";
import { Chapter } from "src/entities/chapter.entity";
import { DataSource, ILike } from "typeorm";
import { Lesson } from "src/entities/lesson.entity";

// Creation of a custom repository.
@Injectable()
export class ChapterRepository {
  constructor(private dataSource: DataSource) { }

  chapterRepository = this.dataSource.getRepository(Chapter);
  lessonRepository = this.dataSource.getRepository(Lesson);


  getChapterByID(chapterId: number) {
    return this.chapterRepository.findOne({
      where: { id: chapterId },
            relations: ['lessons']
    });
    // .createQueryBuilder("chapter")
    // .where("chapter.id = :id", {chapterId})
    // .getOne()
  }

  getAllChapters() {
    return this.chapterRepository.find({ relations: { lessons: true } });
  }

  async searchByName(searchedName: string) {
    /* protected from SQL Injection */
    return await this.chapterRepository.findBy({
      title: ILike(`%${searchedName}%`) //ILike : case insensitive
    });
  }

  async createChapter(title: string, description: string, duration: number, lessonsIds: number[]) {
    let lessons = new Array();
    if (lessonsIds.length > 0) {
      for (let currentId of lessonsIds) {
        const lesson = await this.lessonRepository.findOneBy({ id: currentId });
        if (lesson) lessons.push(lesson);
      }
    }

    const chapter = this.chapterRepository.create({ title, description, duration, lessons });
    return this.chapterRepository.save(chapter);

    // const chapter = this.chapterRepository
    //   .create({title, description, duration});
    //   return this.chapterRepository.save(chapter);
  }


  async updateChapter(chapterId: number, title: string, description: string, duration: number, isActive: boolean, lessonsIds: number[]): Promise<Chapter> {
    const chapter = await this.chapterRepository.findOneBy({ id: chapterId });
    chapter.title = title;
    chapter.description = description;
    chapter.duration = duration;
    chapter.isActive = isActive;

    let lessons = new Array();
    if (lessonsIds.length > 0) {
      for (let currentId of lessonsIds) {
        const lesson = await this.lessonRepository.findOneBy({ id: currentId });
        if (lesson) lessons.push(lesson);
      }
    }

    chapter.lessons = lessons;
    return this.chapterRepository.save(chapter);


    // return this.chapterRepository.save(chapter);
  }

  deleteChapter(chapterId: number) {
    this.chapterRepository.delete(chapterId);
  }
}