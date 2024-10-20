import { CreateBoardDto } from '@board/domain/dto';

export abstract class ICreateBoardUseCase {
    abstract createBoard(
        userId: number,
        createBoardDto: CreateBoardDto,
    ): Promise<void>;
}
