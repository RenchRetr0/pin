import { Provider } from '@nestjs/common';
import {
    CreateImageUseCase,
    ICreateImageUseCase,
} from '@image/domain/use-case/create';

export const CreateImageProvider: Provider = {
    provide: ICreateImageUseCase,
    useClass: CreateImageUseCase,
};
