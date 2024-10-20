import { Provider } from '@nestjs/common';
import {
    IRequestPinUseCase,
    RequestPinUseCase,
} from '@image/domain/use-case/request-pint';

export const RequestPinProvider: Provider = {
    provide: IRequestPinUseCase,
    useClass: RequestPinUseCase,
};
