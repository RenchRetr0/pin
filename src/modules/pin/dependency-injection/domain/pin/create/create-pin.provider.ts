import { Provider } from "@nestjs/common";
import { CreatePinUseCase, ICreatePinUseCase } from "@pin/domain/use-case/pin/create";

export const CreatePinProvider: Provider =
{
    provide: ICreatePinUseCase,
    useClass: CreatePinUseCase
}