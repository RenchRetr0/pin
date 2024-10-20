import { Provider } from '@nestjs/common';
import {
    IUpdateImageUseCase,
    UpdateImageUseCase,
} from '@image/domain/use-case/update';

export const UpdateImageProvider: Provider = {
    provide: IUpdateImageUseCase,
    useClass: UpdateImageUseCase,
};
