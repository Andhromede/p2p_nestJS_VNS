import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToMany, JoinTable, ManyToOne } from "typeorm";
import { Tag } from "./tag.entity";
import { Lesson } from "./lesson.entity";
import { Person } from "./person.entity";

@Entity()
export class Chapter {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    title: string;

    @Column()
    description: string;

    @Column()
    duration: number;

    @Column({ default: true })
    isActive: boolean;

    // @ManyToMany(() => Tag)
    // @JoinTable({ name: "chapter_tag" })
    // tags: Tag[];

    @ManyToMany(() => Tag, (tag) => tag.chapters)
    @JoinTable({ name: "tag_chapter" })
    tags: Tag[]

    @ManyToMany(() => Lesson, (lesson) => lesson.chapters)
    @JoinTable({ name: "chapter_lesson" })
    lessons: Lesson[]

    //One chapter has one creator. One creator can create many chapters.
    @ManyToOne(() => Person, (creator) => creator.chapters)
    creator: Person
}