import { Provider } from '@nestjs/common';
import {
    CreateBoardUseCase,
    ICreateBoardUseCase,
} from '@pin/domain/use-case/board/create';

export const CreateBoardProvider: Provider = {
    provide: ICreateBoardUseCase,
    useClass: CreateBoardUseCase,
};
