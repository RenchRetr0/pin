import { CreateBoardDto } from '@pin/domain/dto/board';
import { BoardModel } from '@pin/domain/model';

export abstract class ICreateBoardUseCase {
    abstract create(
        userId: number,
        createBoardDto: CreateBoardDto,
    ): Promise<void>;
}
