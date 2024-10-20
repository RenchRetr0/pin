import { Provider } from '@nestjs/common';
import { IBoardRepository } from '@board/domain/repository';
import { BoardRepository } from '@board/storage/repository';

export const BoardRepositoryProvider: Provider = {
    provide: IBoardRepository,
    useClass: BoardRepository,
};
