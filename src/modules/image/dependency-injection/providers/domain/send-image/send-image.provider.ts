import { Provider } from '@nestjs/common';
import {
    ISendImageUseCase,
    SendImageUseCase,
} from '@image/domain/use-case/send-time';

export const SendImageProvider: Provider = {
    provide: ISendImageUseCase,
    useClass: SendImageUseCase,
};
