import { Provider } from '@nestjs/common';
import {
    GetImageUseCase,
    IGetImageUseCase,
} from '@pin/domain/use-case/image/get';

export const GetImageProvider: Provider = {
    provide: IGetImageUseCase,
    useClass: GetImageUseCase,
};
