import { Provider } from '@nestjs/common';
import {
    GetImagesUseCase,
    IGetImagesUseCase,
} from '@image/domain/use-case/get/images';

export const GetImagesProvider: Provider = {
    provide: IGetImagesUseCase,
    useClass: GetImagesUseCase,
};
