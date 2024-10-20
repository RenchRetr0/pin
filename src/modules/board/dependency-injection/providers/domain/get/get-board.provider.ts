import { Provider } from '@nestjs/common';
import {
    GetBoardUseCase,
    IGetBoardUseCase,
} from '@board/domain/use-case/get/board';

export const GetBoardProvider: Provider = {
    provide: IGetBoardUseCase,
    useClass: GetBoardUseCase,
};
