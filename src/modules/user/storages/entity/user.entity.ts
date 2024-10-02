import { BoardEntity, ImageEntity } from '@pin/storages/entities';
import { Type } from 'class-transformer';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        type: 'varchar',
        name: 'login',
    })
    login!: string;

    @Column({
        type: 'varchar',
        name: 'access_token',
        nullable: true,
    })
    accessToken?: string | null;

    @Column({
        type: 'varchar',
        name: 'refresh_token',
        nullable: true,
    })
    refreshToken?: string | null;

    @Type(() => Array<ImageEntity>)
    @OneToMany(() => ImageEntity, (image) => image.user)
    images?: ImageEntity[] | null;

    @Type(() => Array<BoardEntity>)
    @OneToMany(() => BoardEntity, (board) => board.user)
    boards?: ImageEntity[] | null;

    @CreateDateColumn({
        name: 'create_at',
        select: false,
    })
    createdAt?: Date;

    @UpdateDateColumn({
        name: 'update_at',
        select: false,
    })
    updateAt?: Date;

    @DeleteDateColumn({
        name: 'deleted_at',
        select: false,
    })
    deletedAt?: Date;
}
