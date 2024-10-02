import { Provider } from "@nestjs/common";
import { CreateImageUseCase, ICreateImageUseCase } from "@pin/domain/use-case/image/create";

export const CreateImageProvider: Provider =
{
    provide: ICreateImageUseCase,
    useClass: CreateImageUseCase
}