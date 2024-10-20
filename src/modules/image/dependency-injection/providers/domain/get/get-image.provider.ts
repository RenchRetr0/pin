import { Provider } from '@nestjs/common';
import {
    GetImageUseCase,
    IGetImageUseCase,
} from '@image/domain/use-case/get/image';

export const GetImageProvider: Provider = {
    provide: IGetImageUseCase,
    useClass: GetImageUseCase,
};
