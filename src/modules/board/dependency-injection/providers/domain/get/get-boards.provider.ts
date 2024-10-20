import { Provider } from '@nestjs/common';
import {
    GetBoardsUseCase,
    IGetBoardsUseCase,
} from '@board/domain/use-case/get/boards';

export const GetBoardsProvider: Provider = {
    provide: IGetBoardsUseCase,
    useClass: GetBoardsUseCase,
};
