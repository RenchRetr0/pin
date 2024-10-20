import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IBoardRepository } from '@board/domain/repository';
import { BoardEntity } from '../entity';
import { BoardModel } from '@board/domain/model';
import { CreateBoardDto } from '@board/domain/dto';

@Injectable()
export class BoardRepository implements IBoardRepository {
    constructor(
        @InjectRepository(BoardEntity)
        private readonly boardRepository: Repository<BoardEntity>,
    ) {}

    async findById(boardId: number): Promise<BoardModel | null> {
        const boardEntity = await this.boardRepository.findOne({
            where: {
                id: boardId,
            },
        });
        if (!boardEntity) return null;
        else {
            const boardModel: BoardModel = {
                id: boardEntity.id,
                name: boardEntity.name,
                boardId: boardEntity.boardId,
                privacy: boardEntity.privacy,
                description: boardEntity.description ?? null,
            };
            return boardModel;
        }
    }

    async findByIdWithUser(
        boardId: number,
        userId: number,
    ): Promise<BoardModel | null> {
        const boardEntity = await this.boardRepository.findOne({
            where: {
                id: boardId,
                user: {
                    id: userId,
                },
            },
            relations: {
                user: true,
            },
        });
        if (!boardEntity) return null;
        else {
            const boardModel: BoardModel = {
                id: boardEntity.id,
                name: boardEntity.name,
                boardId: boardEntity.boardId,
                privacy: boardEntity.privacy,
                description: boardEntity.description ?? null,
                user: boardEntity.user,
            };
            return boardModel;
        }
    }

    async findAllByUserId(userId: number): Promise<BoardModel[]> {
        const boardsEntity = await this.boardRepository.find({
            where: {
                userId: userId,
            },
            order: {
                id: 'DESC',
            },
        });
        const boardsModel = boardsEntity.map((boardEntity) => ({
            id: boardEntity.id,
            name: boardEntity.name,
            boardId: boardEntity.boardId,
            privacy: boardEntity.privacy,
            description: boardEntity.description ?? null,
        }));
        return boardsModel;
    }

    async create(createBoardDto: CreateBoardDto): Promise<BoardModel> {
        const boardEntity = await this.boardRepository.save(createBoardDto);
        const boardModel: BoardModel = {
            id: boardEntity.id,
            name: boardEntity.name,
            boardId: boardEntity.boardId,
            privacy: boardEntity.privacy,
            description: boardEntity.description ?? null,
            userId: boardEntity.userId,
        };
        return boardModel;
    }
}
