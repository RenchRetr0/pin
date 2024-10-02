import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardEntity } from '../entities';
import { Repository } from 'typeorm';
import { IBoardRepository } from '@pin/domain/repositories';
import { BoardModel } from '@pin/domain/model';
import { CreateBoardDto } from '@pin/domain/dto/board';

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
                userId: boardEntity.userId,
            };
            return boardModel;
        }
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
