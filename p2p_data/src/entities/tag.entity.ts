import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany  } from 'typeorm';
import { Training } from './training.entity';
import { Chapter} from './chapter.entity';


@Entity()
export class Tag {
 
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({default: true})
    isActive: boolean;
    
    @OneToMany(() => Training, (training => training.tag))
    trainings: Training[];

    @ManyToMany(() => Chapter, (chapter) => chapter.tags)
    chapters: Chapter[]
}