import { Provider } from '@nestjs/common';
import {
    CreateBoardUseCase,
    ICreateBoardUseCase,
} from '@board/domain/use-case/create';

export const CreateBoardProvider: Provider = {
    provide: ICreateBoardUseCase,
    useClass: CreateBoardUseCase,
};
