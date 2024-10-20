import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../../domain/repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entity';
import { Repository } from 'typeorm';
import { UserModel } from '../../domain/model';
import { CreateUserDto } from '../../domain/dto';

@Injectable()
export class UserRepository implements IUserRepository {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    async findById(userId: number): Promise<UserModel | null> {
        const userEntity = await this.userRepository.findOne({
            where: {
                id: userId,
            },
        });
        if (!userEntity) return null;
        else {
            const userModel: UserModel = {
                id: userEntity.id,
                login: userEntity.login,
                accessToken: userEntity.accessToken ?? null,
                refreshToken: userEntity.refreshToken ?? null,
            };
            return userModel;
        }
    }

    async findByIdWithBoard(
        userId: number,
        boardId: number,
    ): Promise<UserModel | null> {
        const userEntity = await this.userRepository.findOne({
            where: {
                id: userId,
                boards: {
                    id: boardId,
                },
            },
            relations: {
                boards: true,
            },
        });
        if (!userEntity) return null;
        else {
            const userModel: UserModel = {
                id: userEntity.id,
                login: userEntity.login,
                accessToken: userEntity.accessToken ?? null,
                refreshToken: userEntity.refreshToken ?? null,
                boards: userEntity.boards,
            };
            return userModel;
        }
    }

    async create(createUserDto: CreateUserDto): Promise<UserModel> {
        const userEntity = await this.userRepository.save(createUserDto);
        const userModel: UserModel = {
            id: userEntity.id,
            login: userEntity.login,
            accessToken: userEntity.accessToken ?? null,
            refreshToken: userEntity.refreshToken ?? null,
        };
        return userModel;
    }

    async update(userId: number, userModel: UserModel): Promise<void> {
        await this.userRepository.update({ id: userId }, userModel);
    }
}
