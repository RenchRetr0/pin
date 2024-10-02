import { Provider } from '@nestjs/common';
import {
    IUpdateUserUseCase,
    UpdateUserUseCase,
} from '@user/domain/use-case/update';

export const UpdateUserProvider: Provider = {
    provide: IUpdateUserUseCase,
    useClass: UpdateUserUseCase,
};
