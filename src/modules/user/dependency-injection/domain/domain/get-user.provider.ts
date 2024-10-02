import { Provider } from '@nestjs/common';
import { IGetUserUseCase, GetUserUseCase } from '@user/domain/use-case/get';

export const GetUserProvider: Provider = {
    provide: IGetUserUseCase,
    useClass: GetUserUseCase,
};
