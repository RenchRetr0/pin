import { Provider } from '@nestjs/common';
import { IAuthUseCase, AuthUseCase } from '@auth/domain/use-case';

export const AuthProvider: Provider = {
    provide: IAuthUseCase,
    useClass: AuthUseCase,
};
