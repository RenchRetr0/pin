import { Provider } from '@nestjs/common';
import {
    IValidateDateUseCase,
    ValidateDateUseCase,
} from '@image/domain/use-case/validate-date';

export const ValidateTimeProvider: Provider = {
    provide: IValidateDateUseCase,
    useClass: ValidateDateUseCase,
};
