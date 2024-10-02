import { Provider } from '@nestjs/common';
import { IBoardRepository } from '@pin/domain/repositories';
import { BoardRepository } from '@pin/storages/repositories';

export const BoardProvider: Provider = {
    provide: IBoardRepository,
    useClass: BoardRepository,
};
