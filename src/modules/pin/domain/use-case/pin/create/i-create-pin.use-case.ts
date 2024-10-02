import { CreateImageDto } from "@pin/domain/dto";

export abstract class ICreatePinUseCase
{
    abstract createPin(userId: number, createImageDto: CreateImageDto): Promise<void>
}