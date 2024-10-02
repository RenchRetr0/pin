import { UserEntity } from "@user/storages/entity";
import { Type } from "class-transformer";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('image')
export class ImageEntity
{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        type: 'varchar',
        name: 'title'
    })
    title!: string;

    @Column({
        type: 'varchar',
        name: 'description',
        nullable: true
    })
    description?: string | null;

    @Column({
        type: 'varchar',
        name: 'image_url'
    })
    imageUrl!: string;

    @Column({
        type: 'int',
        name: 'user_id',
        select: false
    })
    userId!: number;

    @Type(() => UserEntity)
    @ManyToOne(() => UserEntity, {nullable: true})
    @JoinColumn({name: 'user_id'})
    user?: UserEntity | null;

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