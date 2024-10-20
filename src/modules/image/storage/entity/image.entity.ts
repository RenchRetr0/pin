import { Type } from 'class-transformer';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { BoardEntity } from '@board/storage/entity';

@Entity('image')
export class ImageEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        type: 'varchar',
        name: 'title',
    })
    title!: string;

    @Column({
        type: 'varchar',
        name: 'description',
        nullable: true,
    })
    description?: string | null;

    @Column({
        type: 'varchar',
        name: 'image_url',
    })
    imageUrl!: string;

    @Column({
        type: 'timestamp',
        name: 'date_time',
        nullable: true,
    })
    publishedAt!: Date | null;

    @Column({
        type: 'boolean',
        name: 'is_status',
        default: true,
    })
    isStatus?: boolean | null;

    @Column({
        type: 'varchar',
        name: 'error_message',
        nullable: true,
    })
    errorMessage?: string | null;

    @Column({
        type: 'int',
        name: 'board_id',
    })
    boardId!: number;

    @Type(() => BoardEntity)
    @ManyToOne(() => BoardEntity, { nullable: true })
    @JoinColumn({ name: 'board_id' })
    board?: BoardEntity | null;

    @CreateDateColumn({
        name: 'create_at',
        select: false,
    })
    createAt!: Date;

    @UpdateDateColumn({
        type: 'date',
        select: false,
    })
    updateAt!: Date;

    @DeleteDateColumn({
        type: 'date',
        select: false,
    })
    deleteAt!: Date;
}
